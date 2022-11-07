import styles from "../styles/Register.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/navbar/Navbar";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { app } from "../firebase.js";
import Context from "../context/UserContext";
import { Router, useRouter } from "next/router";
import ErrorAlert from "../components/ErrorAlert";
import NavBarNotLogged from "../components/navbar/NavbarNotLogged";
import PropagateLoader from "react-spinners/SyncLoader";

function Register() {
  const { jwt, setJwt } = useContext(Context);
  const [validations, setValidations] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [phoneExists, setPhoneExists] = useState(false);
  const [visibilityPassword, setVisibilityPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (jwt !== null) router.push(`/`);
  }, [jwt]);
  const [input, setInput] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.phone.length < 10) {
      console.log("10 min");
      return setValidations(true);
    }

    let token = null;
    try {
      setLoading(true);
      const res = await axios.post(
        "https://dobleb.herokuapp.com/user/register",
        {
          email: input.email,
          password: input.password,
          phoneNumber: `+54${input.phone}`,
          name: input.name,
          surname: input.surname,
        }
      );

      if (res) {
        token = res.data.jwt;
        try {
          const auth = getAuth(app);
          const res = await signInWithCustomToken(auth, token);
          if (res) {
            window.localStorage.setItem(
              "UserLogged",
              JSON.stringify(res._tokenResponse.idToken)
            );
            setJwt(res._tokenResponse.idToken);
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error.response.data);
      setError(error.response.data.toString());
      setEmailExists(true);
      if (
        error.response.data ===
        "The user with the provided phone number already exists."
      )
        setPhoneExists(true);

      if (
        error.response.data ===
        "The email address is already in use by another account."
      )
        setEmailExists(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push("/login");
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
      <NavBarNotLogged />
      <div className={styles.background}>
        <div className={styles.opacity}></div>
        {loading && (
          <div className={styles.loading}>
            <PropagateLoader color="#ffff" />
          </div>
        )}

        <ErrorAlert
          text="El numero de teléfono ya se encuentra en uso"
          activated={phoneExists}
          setFunction={setPhoneExists}
        />
        <ErrorAlert
          text="La dirección de email ya se encuentra en uso"
          activated={emailExists}
          setFunction={setEmailExists}
        />
        {error && (
          <ErrorAlert
            text={error}
            activated={emailExists}
            setFunction={setEmailExists}
          />
        )}
        <div className={styles.container}>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <div className={styles.titleContainer}>
            <h1 style={{ margin: 0 }}>Registrarse</h1>
            <button onClick={handleLogin} className={styles.btnLogin}>
              ¿Ya tenés cuenta?
            </button>
          </div>

          <div>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
              <div>
                <div className={styles.nameContainer}>
                  <div className={styles.inputContainer}>
                    <span>Nombre</span>
                    <input
                      minLength="2"
                      required
                      className={styles.input}
                      onChange={handleChange}
                      type="text"
                      name="name"
                      placeholder="Nombre"
                      value={input.name}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <span>Apellido</span>
                    <input
                      minLength="3"
                      required
                      onChange={handleChange}
                      type="text"
                      name="surname"
                      placeholder="Apellido"
                      value={input.surname}
                    />
                  </div>
                </div>
                <div className={styles.phoneContainer}>
                  <div className={styles.inputContainer}>
                    <span>Teléfono</span>
                    <input
                      required
                      onChange={handleChange}
                      type="number"
                      name="phone"
                      placeholder="Telefono"
                      value={input.phone}
                      onFocus={() => {
                        setValidations(false);
                      }}
                    />
                    {validations && (
                      <span className={styles.inputValidation}>
                        Introduce un numero válido
                      </span>
                    )}
                  </div>

                  <div className={styles.inputContainer}>
                    <span>E-mail</span>
                    <input
                      required
                      onChange={handleChange}
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={input.email}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <span>Contraseña</span>
                    <div className={styles.seePassword}>
                      <input
                        pattern=".{6,}"
                        title="6 caracteres mínimo"
                        required
                        onChange={handleChange}
                        type={visibilityPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        value={input.password}
                      />
                      <span
                        onClick={handleSee}
                        className={styles.materialIconsSee}
                      >
                        {!visibilityPassword ? "visibility" : "visibility_off"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button className={styles.btnNext} type="submit">
                Registrarse
                <span className={styles.materialIcons}>content_cut</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
