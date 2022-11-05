import styles from "../styles/WindowModal.module.css";
import Link from "next/link";
import { useContext } from "react";
import Context from "../context/UserContext";
function ModalWindow({ isOpen, setIsOpen }) {
  const { jwt } = useContext(Context);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={isOpen ? styles.modalOpen : ""} onClick={handleClose}>
      <div
        onClick={handleModalClick}
        className={isOpen ? styles.containerOpen : styles.containerClosed}
      >
        <div className={styles.sectionsContainer}>
          <Link href="/turnos">
            <a>Turnos</a>
          </Link>
          <Link href="#services">
            <a>Servicios</a>
          </Link>
          <Link href="#about">
            <a>Nosotros</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;
