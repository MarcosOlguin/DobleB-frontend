import Link from "next/link.js";
import { useContext, useEffect } from "react";
import NavBar from "../components/navbar/Navbar.js";
import NavBarNotLogged from "../components/navbar/NavbarNotLogged.js";
import Context from "../context/UserContext.js";
import styles from "../styles/Home.module.css";

function Home() {
  const { jwt, setJwt } = useContext(Context);
  const logout = () => {
    setJwt(null);
    window.localStorage.clear("UserLogged");
  };
  return (
    <>
      {jwt ? <NavBar /> : <NavBarNotLogged />}
      <div className={styles.container}>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}

export default Home;
