import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { async } from "@firebase/util";
import { user } from "../firebase.js";
import {
  getAuth,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../firebase.js";
import Link from "next/link";

import Context, { UserContextProvider } from "../context/UserContext";

export default function App() {
  const { jwt, setJwt } = useContext(Context);

  useEffect(() => {
    const token = window.localStorage.getItem("UserLogged");

    console.log(jwt);
  }, []);
  const [token, setToken] = useState("");
  const [tokenCliente, setTokenCliente] = useState("");

  const fetchData = async () => {
    const res = await axios.post("http://localhost:3010/signup", {
      email: "sol11@gmail.com",
      password: "123456",
      phoneNumber: "+54123456",
    });

    console.log(res.data);
    if (res) {
      alert("EXITOOO");
      setToken(res.data);
    }
  };

  const login = async () => {
    const auth = getAuth(app);
    const jw = JSON.parse(window.localStorage.getItem("UserLogged"));
    try {
      const res = await signInWithCustomToken(auth, jw);
      setTokenCliente(res._tokenResponse.idToken);
      console.log(tokenCliente);
    } catch (error) {
      console.error(error.code);
      if (error.code === "auth/invalid-custom-token") return alert("error");
    }
  };

  const entrar = async () => {
    const auth = getAuth(app);

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        "sol@gmail.com",
        "123456"
      );
      console.log(res._tokenResponse);
      alert("logeado correctamente");
      setToken(res._tokenResponse.idToken);
    } catch (error) {
      console.error(error.code);
      if (error.code === "auth/user-not-found")
        return alert("email o contraseña incorrectos");
    }
  };

  const salir = async () => {
    const auth = getAuth(app);
    try {
      await signOut(user);
      alert("saliste correctamente");
      console.log(token);
    } catch (error) {
      console.error(error.code);
    }
  };

  const verificar = async () => {
    console.log(user);

    const cd = JSON.parse(window.localStorage.getItem("UserLogged"));
    const res = await axios.get("http://localhost:3010/user/profile", {
      headers: {
        Authorization: `Bearer ` + cd,
      },
    });
    console.log(res);
  };

  return (
    <UserContextProvider>
      <div className={styles.container}>
        <Head>
          <title>Create Next Apap</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <button onClick={fetchData}>Registrarse</button>
          <button onClick={login}>Obtener</button>
          <button onClick={verificar}>
            Verificar token generado por cliente
          </button>
          <button onClick={entrar}>Logearse</button>
          <button onClick={salir}>Salir</button>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    </UserContextProvider>
  );
}
