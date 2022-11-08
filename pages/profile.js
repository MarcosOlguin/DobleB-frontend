import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Context from "../context/UserContext";
import styles from "../styles/Profile.module.css";
import { user, updatePass } from "../firebase.js";
import { signOut } from "firebase/auth";
import SuccessfulAlert from "../components/SuccessfulAlert";
import NavBarNotLogged from "../components/navbar/NavbarNotLogged";
import { useRouter } from "next/router";
import ProfileEdit from "../components/profile/ProfileEdit";
import PropagateLoader from "react-spinners/SyncLoader";

function Profile() {
  const [data, setData] = useState(null);
  const [appointExpired, setAppointExpired] = useState(false);

  //SUCCESSFUL ALERT
  const [successful, setSuccessful] = useState(false);
  const [resetPass, setResetPass] = useState(false);
  const [cancelAppoint, setCancelAppoint] = useState(false);
  //
  const [edit, setEdit] = useState(false);
  const { jwt, setJwt } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://dobleb.herokuapp.com/user/profile",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
        console.log(error.response.status);
        if (error.response.status === 403) {
          window.localStorage.clear("UserLogged");
          setJwt(null);
        }
      }
    };
    if (jwt) {
      fetchData();
    } else {
      router.push("/");
    }
  }, [jwt, cancelAppoint]);

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
        "https://dobleb.herokuapp.com/user/update-data",
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
    } catch (error) {
      console.error(error.code);
    }
  };

  useEffect(() => {
    if (data) {
      if (new Date(data.appointment) < new Date()) {
        expires();
      }
    }
  }, [data]);

  const expires = async () => {
    try {
      const res = await axios.patch(
        "https://dobleb.herokuapp.com/turno/cancelar-turno",
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    try {
      const res = axios.patch(
        "https://dobleb.herokuapp.com/turno/cancelar-turno",
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setCancelAppoint(true);
    } catch (error) {
      console.error(error);
    }
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
            <ProfileEdit
              handleChange={handleChange}
              handlePassReset={handlePassReset}
              handleUpdate={handleUpdate}
              data={data}
            />
          ) : (
            <>
              <div className={styles.container}>
                <div>
                  <h2>Tus Turnos</h2>
                  {data.appointment ? (
                    <div className={styles.appointContainer}>
                      <p className={styles.p}>
                        {new Date(data.appointment).toLocaleString()}
                      </p>
                      {appointExpired && <span>Turno expirado</span>}

                      <button
                        onClick={handleCancel}
                        className={styles.btnCancel}
                      >
                        Cancelar turno
                      </button>
                    </div>
                  ) : (
                    <>
                      <p>Sin turnos</p>
                    </>
                  )}
                  <SuccessfulAlert
                    activated={cancelAppoint}
                    setFunction={setCancelAppoint}
                    text={"Turno cancelado con exito"}
                  />
                </div>
                <div className={styles.editDates}>
                  <h2>Tus datos</h2>
                  <button
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    <div
                      style={{ display: "flex", alignContent: "flex-start" }}
                    >
                      Modificar datos
                      <span className={styles.materialIcons}>edit</span>
                    </div>
                  </button>
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
        <div className={styles.notLogged}>
          <PropagateLoader color={"#ffff"} />
        </div>
      )}
    </>
  );
}

export default Profile;
