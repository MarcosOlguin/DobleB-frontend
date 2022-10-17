import { useContext, useEffect, useState } from "react";
import NavBar from "../components/navbar/Navbar";
import styles from "../styles/Login.module.css";
import { app } from "../firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/router";
import Context from "../context/UserContext";
import NavBarNotLogged from "../components/navbar/NavbarNotLogged";

function Login() {
  const { jwt, setJwt } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (jwt !== null) router.push(`/home`);
  }, [jwt]);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth(app);

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      if (res) {
        console.log(res._tokenResponse);
        window.localStorage.setItem(
          "UserLogged",
          JSON.stringify(res._tokenResponse.idToken)
        );
        setJwt(res._tokenResponse.idToken);
      }
    } catch (error) {
      return alert("email o contraseña incorrectos");
    }
  };

  //const local = window.localStorage.getItem("UserLogged");
  // console.log(local);

  const profile = async () => {
    const res = await axios.get("http://localhost:3010/home", {
      headers: {
        Authorization: `Bearer ` + tokenCliente,
      },
    });
    console.log(res);
  };

  return (
    <div>
      {jwt ? <NavBar /> : <NavBarNotLogged />}
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit}
          onChange={handleChange}
          className={styles.form}
        >
          <div className={styles.inputContainer}>
            <p>E-mail</p>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Ingresa tu e-mail"
            />
          </div>
          <div className={styles.inputContainer}>
            <p>Contraseña</p>
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button type="submit" className={styles.btnLogin}>
            Iniciar sesión
            <span className={styles.materialIcons}>content_cut</span>
          </button>
        </form>
        <div className={styles.lastBtnContainer}>
          <button className={styles.lastBtn} onClick={profile}>
            ¿No tenes cuenta?
          </button>
          <button className={styles.lastBtn}>Olvide mi contraseña</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
