import Link from "next/link";
import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.socialContainer}>
        <p>Nuestras Redes</p>
        <Link
          target="_blank"
          href={"https://www.instagram.com/doble_b_estudio/"}
        >
          <a>
            {" "}
            <i className="fa-brands fa-instagram"></i>Doble B
          </a>
        </Link>
        <Link target="_blank" href={"https://www.instagram.com/santi.rc1889/"}>
          <a>
            {" "}
            <i className="fa-brands fa-instagram"></i>Santiago Benitez
          </a>
        </Link>
        <Link
          target="_blank"
          href={"https://www.instagram.com/nico.benitez111/"}
        >
          <a>
            {" "}
            <i className="fa-brands fa-instagram"></i>Nico Benitez
          </a>
        </Link>
      </div>
      <p className={styles.p}>
        Saavedra 2630, Granadero Baigorria, Santa Fe, Argentina
      </p>
      <p className={styles.marcos}>
        Developed by Marcos<i className="fa-solid fa-screwdriver-wrench"></i>
      </p>
    </div>
  );
}

export default Footer;
