import axios from "axios";
import { useContext, useEffect, useState } from "react";
import NavBar from "../components/navbar/Navbar";
import Context from "../context/UserContext";
import styles from "../styles/Profile.module.css";
import { user, updatePass } from "../firebase.js";
import { getAuth, sendPasswordResetEmail, signOut } from "firebase/auth";
import SuccessfulAlert from "../components/SuccessfulAlert";
import NavBarNotLogged from "../components/navbar/NavbarNotLogged";
import { useRouter } from "next/router";

function Profile() {
  const [data, setData] = useState(null);
  const [loginRedirect, setloginRedirect] = useState();
  //SUCCESSFUL ALERT
  const [successful, setSuccessful] = useState(false);
  const [resetPass, setResetPass] = useState(false);
  //
  const [edit, setEdit] = useState(false);
  const { jwt, setJwt } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3010/user/profile", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setData(res.data);
        console.log(res);
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 403) {
          window.localStorage.clear("UserLogged");
          setJwt(null);
        }
      }
    };
    if (jwt) fetchData();
  }, [jwt]);

  useEffect(() => {
    if (!jwt) {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  }, [loginRedirect]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:3010/user/update-data",
        {
          data: {
            name: data.name,
            surname: data.surname,
            email: data.email,
            phoneNumber: data.phoneNumber.toString(),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        setSuccessful(true);
        setEdit(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePassReset = async () => {
    updatePass(data.email);
    setEdit(false);
    setResetPass(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(user);
      setJwt(null);
      window.localStorage.clear("UserLogged");
      router.push("/login");
      console.log(token);
    } catch (error) {
      console.error(error.code);
    }
  };

  const redirect = () => {
    setloginRedirect(true);
  };
  return (
    <>
      <NavBarNotLogged />
      {data ? (
        <div className={styles.background}>
          <div className={styles.h1Container}>
            <h1 className={styles.h1}>Perfil</h1>{" "}
            <div className={styles.logout} onClick={handleLogout}>
              Salir <span className={styles.materialIcons}>logout</span>
            </div>
          </div>

          {edit ? (
            <div className={styles.editContainer}>
              <div className={styles.editSubContainer}>
                <div>
                  <p>Nombre</p>
                  <input
                    value={data.name}
                    onChange={handleChange}
                    name="name"
                  />
                </div>
                <div>
                  <p>Apellido</p>
                  <input
                    value={data.surname}
                    onChange={handleChange}
                    name="surname"
                  />
                </div>
                <div>
                  <p>Email</p>
                  <input
                    value={data.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
                <div>
                  <p>Teléfono</p>
                  <input
                    value={data.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
                  />
                </div>
              </div>
              <div className={styles.editBtnsContainer}>
                <button onClick={handleUpdate}>Guardar cambios</button>
                <button onClick={handlePassReset}>
                  Reestablecer contraseña
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.container}>
                <div className={styles.editDates}>
                  <p>Tus datos</p>
                  <div
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    <div style={{ display: "flex", alignContenct: "center" }}>
                      Modificar datos
                      <span className={styles.materialIcons}>edit</span>
                    </div>
                  </div>
                </div>

                <div className={styles.dates}>
                  <p>Nombre</p>
                  <p>{data.name}</p>
                </div>
                <div className={styles.dates}>
                  <p>Apellido</p>
                  <p>{data.surname}</p>
                </div>
                <div className={styles.dates}>
                  <p>Email</p>
                  <p>{data.email}</p>
                </div>
                <div className={styles.dates}>
                  <p>Telefono</p>
                  <p>+{data.phoneNumber}</p>
                </div>
                <SuccessfulAlert
                  activated={resetPass}
                  setFunction={setResetPass}
                  text={
                    "Se ha enviado un email a tu dirección, revisa la bandeja de spam!"
                  }
                />
                <SuccessfulAlert
                  activated={successful}
                  setFunction={setSuccessful}
                  text={"Cambios guardados con éxito!"}
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <div onLoad={redirect} className={styles.notLogged}>
          <p>No tenes una sesion abierta!</p>
        </div>
      )}
    </>
  );
}

export default Profile;
