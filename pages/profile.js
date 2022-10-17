import axios from "axios";
import { useContext, useEffect, useState } from "react";
import NavBar from "../components/navbar/Navbar";
import Context from "../context/UserContext";
import styles from "../styles/Profile.module.css";
import { user, updatePass } from "../firebase.js";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function Profile() {
  const [data, setData] = useState(null);
  const { jwt, setJwt } = useContext(Context);
  const [edit, setEdit] = useState(false);
  const token = JSON.parse(jwt);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3010/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePassReset = async () => {
    updatePass(data.email);
  };
  return (
    <>
      <NavBar />
      {data && (
        <div className={styles.background}>
          <h1 className={styles.h1}>Perfil</h1>
          <div
            onClick={() => {
              setEdit(true);
            }}
          >
            <span>Modificar datos</span>
            <span className={styles.materialIcons}>edit</span>
          </div>
          {edit ? (
            <div>
              <input value={data.name} onChange={handleChange} name="name" />
              <input
                value={data.surname}
                onChange={handleChange}
                name="surname"
              />
              <input value={data.email} onChange={handleChange} name="email" />
              <input
                value={data.phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
              />
              <button onClick={handleUpdate}>Guardar cambios</button>
              <button onClick={handlePassReset}>Reestablecer contraseña</button>
            </div>
          ) : (
            <div className={styles.container}>
              <p>datos</p>
              <p>Nombre: {data.name}</p>
              <p>Apellido: {data.surname}</p>
              <p>Email: {data.email}</p>
              <p>Telefono: {data.phoneNumber}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Profile;
