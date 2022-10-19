import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "../styles/ErrorAlert.module.css";

function ErrorAlert({ text, activated, setFunction }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (activated === true) {
      setEnabled(true);
      setTimeout(() => {
        setEnabled(false);
        setFunction(false);
      }, 4000);
    }
  }, [activated]);
  return (
    <AnimatePresence>
      {enabled && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          className={styles.container}
        >
          <p>{text}</p>

          <span className={styles.materialIcons}>close</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ErrorAlert;
