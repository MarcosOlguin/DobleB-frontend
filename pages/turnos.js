import NavBarNotLogged from "../components/navbar/NavbarNotLogged";
import styles from "../styles/Appointment.module.css";
import whatsappIcon from "../public/whatsapppp.png";
import backgroundImgSanti from "../public/background.jpeg";
import backgroundImgNico from "../public/nico.jpg";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

function Turnos() {
  const route = useRouter();
  const handleClickAppointment = () => {
    route.push("https://walink.co/ee1c6d");
  };

  return (
    <div>
      <NavBarNotLogged />
      <div className={styles.container}>
        <h2>Escribinos y reseva tu turno!</h2>

        <div>
          <p>Para Barberia</p>
          <div className={styles.barbarContainer}>
            <div className={styles.imgContainer}>
              <Image src={backgroundImgSanti} width={130} height={120} />
            </div>
            <p>Profesional: Santiago</p>
            <Link href={"https://walink.co/ee1c6d"}>
              <a className={styles.button}>Reservar Turno</a>
            </Link>
          </div>
        </div>

        <div style={{ paddingBottom: 100, backgroundColor: "#e2e2e2" }}>
          <p>Para Tattoos</p>
          <div className={styles.tattooContainer}>
            <div className={styles.imgContainer}>
              <Image src={backgroundImgNico} width={130} height={120} />
            </div>
            <p>Profesional: Nico</p>

            <button className={styles.button} onClick={handleClickAppointment}>
              Resevar Turno
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Turnos;
