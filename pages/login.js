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
import { async } from "@firebase/util";
import ErrorAlert from "../components/ErrorAlert";

function Login() {
  //TOKEN
  const { jwt, setJwt } = useContext(Context);
  //password
  const [resetPassword, setResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordChangeAlert, setPasswordChangeAlert] = useState(false);
  //
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [visibilityPassword, setVisibilityPassword] = useState(false);
  //
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  //

  useEffect(() => {
    if (jwt !== null) router.push(`/`);
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
      setWrongCredentials(true);
    }
  };

  const handleRegister = async () => {
    router.push("/register");
  };

  const handleResetPass = (e) => {
    setResetPassword(true);
    setNewPassword(e.target.value);
  };

  const handleSendResetPass = async (e) => {
    e.preventDefault();
    await passwordReset(newPassword);
    setResetPassword(false);
    setPasswordChangeAlert(true);
  };

  const handleSee = () => {
    if (!visibilityPassword) {
      setVisibilityPassword(true);
    } else {
      setVisibilityPassword(false);
    }
  };

  return (
    <div>
      {!resetPassword ? (
        <>
          {jwt ? <NavBar /> : <NavBarNotLogged />}
          <div className={styles.container}>
            <div>
              <h2>Bienvenido! ¿Ya es hora de un nuevo corte?</h2>
              <p style={{ fontWeight: "bold" }}>
                Ingresa y reservalo para cuando quieras
              </p>
            </div>

            <ErrorAlert
              text={"Email o contraseña incorrectos"}
              setFunction={setWrongCredentials}
              activated={wrongCredentials}
            />
            <form
              onSubmit={handleSubmit}
              onChange={handleChange}
              className={styles.form}
            >
              <div className={styles.inputContainer}>
                <p>E-mail</p>
                <input
                  required
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Ingresa tu e-mail"
                />
              </div>
              <div className={styles.inputContainer}>
                <p>Contraseña</p>
                <div className={styles.seePassword}>
                  <input
                    className={styles.input}
                    type={!visibilityPassword ? "password" : "text"}
                    name="password"
                    placeholder="Ingresa tu contraseña"
                  />
                  <span onClick={handleSee} className={styles.materialIconsSee}>
                    {!visibilityPassword ? "visibility" : "visibility_off"}
                  </span>
                </div>
              </div>

              <button type="submit" className={styles.btnLogin}>
                <p>Iniciar sesión</p>
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
            <span>Tu direccion de correo electrónico</span>
            <form className={styles.Resetform} onSubmit={handleSendResetPass}>
              <input
                className={styles.resetInput}
                required
                type="email"
                name="password-reset"
                placeholder="Email"
                value={newPassword}
                onChange={handleResetPass}
              />
              <button>Enviar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
