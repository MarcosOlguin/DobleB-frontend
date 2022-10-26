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
import img5 from "../public/5.jpeg";
import img1 from "../public/1.jpeg";
import img2 from "../public/2.jpeg";
import img3 from "../public/3.jpeg";
import img4 from "../public/4.jpeg";
import dobleBImg from "../public/DobleB2.png";
import Footer from "../components/Footer.js";

function Home() {
  const { jwt, setJwt } = useContext(Context);
  const router = useRouter();

  return (
    <>
      <Script
        src="https://kit.fontawesome.com/61e3109911.js"
        crossorigin="anonymous"
      ></Script>
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
              <p>Hacemos todo tipo de corte utilizando las mejores técnicas.</p>
            </div>
            <div className={styles.servicesRight}>
              <span>Realizamos afeitado y perfilado de barbas</span>
              <Image src={iconBeard} height={60} width={60} />
            </div>
            <div className={styles.servicesLeft}>
              <Image src={iconColoration} height={60} width={60} />
              <p>Hacemos mechas y coloración global de distintos colores.</p>
            </div>
            <div className={styles.servicesRight}>
              <span>Estudio de tattoos con diseños personalizados.</span>
              <Image src={iconTattoo} width={60} height={60} />
            </div>
            <div className={styles.servicesLeft}>
              <Image src={iconPiercing} width={60} height={60} />
              <p>
                Perforaciones con la mayor precisión y todas las medidas
                sanitarias
              </p>
            </div>
          </div>
          <span className={styles.h2}>Galería</span>
          <Image src={img5} />
          <Image src={img1} />
          <Image src={img2} />
          <Image src={img3} />
          <Image src={img4} />
          <div className={styles.aboutContainer}>
            <span className={styles.spanAbout}>Sobre</span>
            <div className={styles.aboutDobleb}>
              <Image src={dobleBImg} width={180} height={180}></Image>
            </div>
            <p>
              Somos un estudio dedicado a varios sectores del estilo, tenemos
              barberia en dónde realizamos cortes, afeitado, coloración y
              diseños con navaja.
            </p>
            <p>
              También contamos con un estudio de tattoos y de perforaciones en
              el que hacemos todo tipos de diseños a medida.
            </p>
            <p>
              Nos encontramos en Saavedra 2630 en Granadero Baigorria, Santa Fe
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
