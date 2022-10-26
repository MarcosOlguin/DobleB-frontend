import Head from "next/head";
import Script from "next/script";
import { UserContextProvider } from "../context/UserContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Head>
        {" "}
        <title>Doble-B</title>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato&family=Raleway:wght@200;400&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://kit.fontawesome.com/61e3109911.js"
          crossorigin="anonymous"
        ></Script>
      </Head>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
