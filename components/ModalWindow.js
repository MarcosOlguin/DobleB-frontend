import styles from "../styles/WindowModal.module.css";
function ModalWindow({ isOpen, setIsOpen }) {
  console.log(isOpen);

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
        modal
      </div>
    </div>
  );
}

export default ModalWindow;
