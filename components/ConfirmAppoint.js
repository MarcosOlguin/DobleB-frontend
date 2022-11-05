import styles from "../styles/ConfirmAppoint.module.css";

function ConfirmAppoint({ dateSelected, reserveDate, handleReserve }) {
  return (
    <div className={styles.container}>
      <h2>Confirmar Turno</h2>

      <div className={styles.data}>
        <div className={styles.dataContainer}>
          <h3>Fecha:</h3>
          <span>{new Date(dateSelected).toLocaleDateString()}</span>
        </div>
        <div className={styles.dataContainer}>
          <h3>Hora:</h3>
          <span>{new Date(reserveDate).toLocaleTimeString()} hs</span>
        </div>
        <div className={styles.dataContainer}>
          <h3>Tipo:</h3>
          <span>Corte</span>
        </div>
        <div className={styles.dataContainer}>
          <h3>Precio:</h3>
          <span>$1000</span>
        </div>
        <div className={styles.dataContainer}>
          <h3>Ubicación:</h3>
          <span>Saavedra 2630, Granadero Baigorria, Santa Fe</span>
        </div>
      </div>

      <button
        className={styles.btn}
        onClick={() => {
          handleReserve(reserveDate);
        }}
      >
        Confirmar <i className="fa-regular fa-calendar-check"></i>
      </button>
    </div>
  );
}

export default ConfirmAppoint;
