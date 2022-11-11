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
import img6 from "../public/6.jpg";
import dobleBImg from "../public/DobleB2.png";
import Footer from "../components/Footer.js";
import { AnimatePresence, motion } from "framer-motion";

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
        <div className={styles.topBackground}>
          <div className={styles.imgContainer}>
            <motion.p
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ delay: 0, duration: 2 }}
            >
              Creamos tu mejor imagen
            </motion.p>

            <Image
              className={styles.backgroundImage}
              src={backgroundImage}
              height={706}
            />
          </div>
          <div className={styles.btnContainer}>
            <h2>Reserva tu turno ahora</h2>
            <button
              onClick={() => {
                router.push("/turnos");
              }}
              className={styles.backgroundBtn}
            >
              Reservar turno
            </button>
          </div>
        </div>

        <div id="services" className={styles.container}>
          {" "}
          <div className={styles.titleContainer}>
            <span className={styles.h2}>Nuestros servicios</span>
            <span className={styles.description}>
              Ofrecemos los siguiente servicios
            </span>
          </div>
          <div className={styles.servicesContainer}>
            <div className={styles.servicesLeft}>
              <h3>Cortes</h3>
              <Image src={iconHaircut} height={60} width={60} />
              <p>Hacemos todo tipo de corte utilizando las mejores técnicas.</p>
            </div>
            <div className={styles.servicesRight}>
              <span>Realizamos afeitado y perfilado de barbas</span>
              <Image src={iconBeard} height={60} width={60} />
              <h3>Afeitado</h3>
            </div>
            <div className={styles.servicesLeft}>
              <h3>Coloración</h3>
              <Image src={iconColoration} height={60} width={60} />
              <p>Hacemos mechas y coloración global de distintos colores.</p>
            </div>
            <div className={styles.servicesRight}>
              <span>Estudio de tattoos con diseños personalizados.</span>
              <Image src={iconTattoo} width={60} height={60} />
              <h3>Tattoos</h3>
            </div>
            <div className={styles.servicesLeft}>
              <h3>Piercings</h3>
              <Image src={iconPiercing} width={60} height={60} />
              <p>
                Perforaciones con la mayor precisión y todas las medidas
                sanitarias
              </p>
            </div>
          </div>
          <span className={styles.spanGalery}>Galería</span>
          <div>
            <div className={styles.GaleryContainer}>
              <Image src={img5} />

              <Image src={img2} />
              <Image src={img3} />
              <Image src={img1} />
              <Image src={img4} />
              <Image src={img6} />
            </div>
            <div id="about" className={styles.aboutContainer}>
              <span className={styles.spanAbout}>Sobre</span>
              <div className={styles.aboutDobleb}>
                <Image src={dobleBImg} width={155} height={158}></Image>
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
              <p>Encontranos en Saavedra 2660, Granadero Baigorria, Santa Fe</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
