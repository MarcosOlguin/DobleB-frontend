import { useContext, useEffect, useState } from "react";
import NavBar from "../components/navbar/Navbar";
import styles from "../styles/Login.module.css";
import { app, passwordReset } from "../firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import Context from "../context/UserContext";
import NavBarNotLogged from "../components/navbar/NavbarNotLogged";
import SuccessfulAlert from "../components/SuccessfulAlert";
import ErrorAlert from "../components/ErrorAlert";
import SyncLoader from "react-spinners/SyncLoader";

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
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const res = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      if (res) {
        window.localStorage.setItem(
          "UserLogged",
          JSON.stringify(res._tokenResponse.idToken)
        );
        setJwt(res._tokenResponse.idToken);
      }
    } catch (error) {
      setWrongCredentials(true);
    } finally {
      setLoading(false);
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
    <>
      {jwt ? <NavBar /> : <NavBarNotLogged />}
      <div className={styles.background}>
        <div className={styles.opacity}></div>
        {loading && (
          <div className={styles.loading}>
            <SyncLoader color="#ffff" />
          </div>
        )}
        {!resetPassword ? (
          <>
            <div className={styles.container}>
              <div>
                <h2>Bienvenido! ??Ya es hora de un nuevo corte?</h2>
                <p style={{ fontWeight: "bold" }}>
                  Ingresa y reservalo para cuando quieras
                </p>
              </div>

              <ErrorAlert
                text={"Email o contrase??a incorrectos"}
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
                  <p>Contrase??a</p>
                  <div className={styles.seePassword}>
                    <input
                      className={styles.input}
                      type={!visibilityPassword ? "password" : "text"}
                      name="password"
                      placeholder="Ingresa tu contrase??a"
                    />
                    <span
                      onClick={handleSee}
                      className={styles.materialIconsSee}
                    >
                      {!visibilityPassword ? "visibility" : "visibility_off"}
                    </span>
                  </div>
                </div>

                <button type="submit" className={styles.btnLogin}>
                  <p>Iniciar sesi??n</p>
                  <span className={styles.materialIcons}>content_cut</span>
                </button>
              </form>
              <div className={styles.lastBtnContainer}>
                <button className={styles.lastBtn} onClick={handleRegister}>
                  ??No tenes cuenta?
                </button>
                <button onClick={handleResetPass} className={styles.lastBtn}>
                  Olvide mi contrase??a
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
          <div className={styles.resetContainer}>
            <h2>Restablecer contrase??a</h2>
            <span>Tu direccion de correo electr??nico</span>
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
        )}
      </div>
    </>
  );
}

export default Login;
