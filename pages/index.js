import Image from "next/image.js";
import Link from "next/link.js";
import { useContext, useEffect } from "react";
import NavBar from "../components/navbar/Navbar.js";
import NavBarNotLogged from "../components/navbar/NavbarNotLogged.js";
import Context from "../context/UserContext.js";
import styles from "../styles/Home.module.css";
import backgroundImage from "../public/background.jpeg";
import iconHaircut from "../public/icon-corte2.png";
import iconBeard from "../public/beard2.png";
import iconColoration from "../public/coloration2.png";
import iconTattoo from "../public/tattoo2.png";
import iconPiercing from "../public/piercing2.png";
import { useRouter } from "next/router.js";
import Head from "next/head.js";
import Script from "next/script.js";

function Home() {
  const { jwt, setJwt } = useContext(Context);
  const router = useRouter();

  return (
    <>
      <NavBarNotLogged />
      <div className={styles.containerr}>
        <div style={{ backgroundColor: "#e2e2e2" }}>
          <div className={styles.imgContainer}>
            <p>Creamos tu mejor imagen</p>
            <Image className={styles.backgroundImage} src={backgroundImage} />
          </div>

          <button
            onClick={() => {
              router.push("/turnos");
            }}
            className={styles.backgroundBtn}
          >
            Reservar turno
          </button>
        </div>

        <div className={styles.container}>
          {" "}
          <span className={styles.h2}>Nuestros servicios</span>
          <div className={styles.servicesContainer}>
            <div className={styles.servicesLeft}>
              <Image src={iconHaircut} height={60} width={60} />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempora expedita odio
              </p>
            </div>
            <div className={styles.servicesRight}>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempora expedita odio
              </span>
              <Image src={iconBeard} height={60} width={60} />
            </div>
            <div className={styles.servicesLeft}>
              <Image src={iconColoration} height={60} width={60} />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempora expedita odio
              </p>
            </div>
            <div className={styles.servicesRight}>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempora expedita odio
              </span>
              <Image src={iconTattoo} width={60} height={60} />
            </div>
            <div className={styles.servicesLeft}>
              <Image src={iconPiercing} width={60} height={60} />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempora expedita odio
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
