import NavBarNotLogged from "../components/navbar/NavbarNotLogged";
import styles from "../styles/Appointment.module.css";
import whatsappIcon from "../public/whatsapppp.png";
import backgroundImgSanti from "../public/background.jpeg";
import backgroundImgNico from "../public/nico.jpg";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import tattooIcon from "../public/tattoo.png";

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
          <p className={styles.p}>
            Para Barberia <i class="fa-solid fa-scissors"></i>
          </p>
          <div className={styles.barbarContainer}>
            <div className={styles.imgContainer}>
              <Image
                alt="img"
                src={backgroundImgSanti}
                width={130}
                height={120}
              />
            </div>
            <p>Profesional: Santiago Benitez</p>
            <Link href={"https://walink.co/ee1c6d"}>
              <a className={styles.button}>
                Reservar
                <Image src={whatsappIcon} width={25} height={25} />
              </a>
            </Link>
          </div>
        </div>

        <div>
          <p className={styles.p}>
            Para Tattoos <Image src={tattooIcon} width={25} height={25} />
          </p>
          <div className={styles.barbarContainer}>
            <div className={styles.imgContainer}>
              <Image
                alt="img"
                src={backgroundImgNico}
                width={130}
                height={120}
              />
            </div>
            <p>Profesional: Nicolas Benitez</p>

            <Link href={"https://walink.co/ee1c6d"}>
              <a className={styles.button}>
                Reservar
                <Image src={whatsappIcon} width={25} height={25} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Turnos;
