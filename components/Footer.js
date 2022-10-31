import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.socialContainer}>
        <p>Nuestras Redes</p>
        <span>
          <i className="fa-brands fa-instagram"></i>Doble-B
        </span>
        <span>
          <i className="fa-brands fa-instagram"></i>Santiago Benitez
        </span>
        <span>
          <i className="fa-brands fa-instagram"></i>Nicolas Benitez
        </span>
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
