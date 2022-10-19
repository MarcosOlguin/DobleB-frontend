import { useEffect, useState } from "react";
import styles from "../styles/SuccessfulAlert.module.css";
import { AnimatePresence, motion } from "framer-motion";

function SuccessfulAlert({ activated, setFunction, text }) {
  const [enabled, setEnabled] = useState(false);
  console.log(activated);

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
          {text}
          <span className={styles.materialIcons}>done</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SuccessfulAlert;
