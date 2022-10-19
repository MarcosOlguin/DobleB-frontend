import { useContext, useEffect, useState } from "react";
import NavBar from "../components/navbar/Navbar";
import styles from "../styles/Login.module.css";
import { app, passwordReset } from "../firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/router";
import Context from "../context/UserContext";
import NavBarNotLogged from "../components/navbar/NavbarNotLogged";
import SuccessfulAlert from "../components/SuccessfulAlert";

function Login() {
  const { jwt, setJwt } = useContext(Context);
  const [resetPassword, setResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordChangeAlert, setPasswordChangeAlert] = useState(false);
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (jwt !== null) router.push(`/home`);
  }, [jwt]);

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

  const handleRegister = async () => {
    router.push("/register");
  };

  const handleResetPass = (e) => {
    setResetPassword(true);
    setNewPassword(e.target.value);
  };

  const handleSendResetPass = (e) => {
    e.preventDefault();
    //passwordReset(newPassword);

    setResetPassword(false);
    setPasswordChangeAlert(true);
  };

  return (
    <div>
      {!resetPassword ? (
        <>
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
              <button className={styles.lastBtn} onClick={handleRegister}>
                ¿No tenes cuenta?
              </button>
              <button onClick={handleResetPass} className={styles.lastBtn}>
                Olvide mi contraseña
              </button>
            </div>
            <SuccessfulAlert
              text={"Enviado correctamente! Revisa tu bandeja de spam"}
              activated={passwordChangeAlert}
              setFunction={setPasswordChangeAlert}
            />
          </div>
        </>
      ) : (
        <div>
          <NavBarNotLogged />
          <div className={styles.resetContainer}>
            <div>
              <p>Tu direccion de correo electrónico</p>
              <form onSubmit={handleSendResetPass}>
                <input
                  required
                  type="email"
                  name="password-reset"
                  placeholder="email"
                  value={newPassword}
                  onChange={handleResetPass}
                />
                <button>Enviar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
