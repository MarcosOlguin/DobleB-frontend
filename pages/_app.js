import { useContext } from "react";
import Context, { UserContextProvider } from "../context/UserContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
        rel="stylesheet"
      />

      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
