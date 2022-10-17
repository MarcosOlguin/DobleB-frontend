import Link from "next/link.js";
import { useContext, useEffect } from "react";
import NavBar from "../components/navbar/Navbar.js";
import NavBarNotLogged from "../components/navbar/NavbarNotLogged.js";
import Context from "../context/UserContext.js";

function Home() {
  const { jwt, setJwt } = useContext(Context);
  const logout = () => {
    setJwt(null);
    window.localStorage.clear("UserLogged");
  };
  return (
    <>
      {jwt ? <NavBar /> : <NavBarNotLogged />}
      <div style={{ height: 2000 }}>
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
