import styles from "../styles/WindowModal.module.css";
import { AnimatePresence, motion } from "framer-motion";
function ModalWindow({ isOpen, setIsOpen }) {
  console.log(isOpen);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    // <div
    //   className={isOpen ? styles.modalOpen : styles.modalClose}
    //   onClick={handleClose}
    // >
    //   <div
    //     onClick={handleModalClick}
    //     className={isOpen ? styles.containerOpen : styles.containerClosed}
    //   >
    //     modal
    //   </div>
    // </div>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={handleClose}
          className={styles.opacity}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={handleModalClick}
            className={styles.animate}
            initial={{ y: "-100%" }}
            animate={{ y: 10, opacity: 1 }}
            exit={{ y: "-100%" }}
          >
            asd
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalWindow;
