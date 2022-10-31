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
      </Head>
      <Script
        src="https://kit.fontawesome.com/61e3109911.js"
        crossorigin="anonymous"
      ></Script>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
