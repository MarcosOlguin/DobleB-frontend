import styles from "../../styles/NavBarNotLogged.module.css";
import { useRouter } from "next/router";
import ModalWindow from "../ModalWindow";
import { useEffect, useState } from "react";
import Image from "next/image";
import dobleBImg from "../../public/DobleB2.png";
import { AnimatePresence, motion } from "framer-motion";

function NavBarNotLogged() {
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const router = useRouter();
  const handleClickHome = () => {
    router.push("/home");
  };
  const handleClickLogin = () => {
    setDisabled(true);
    router.push("/login");
  };
  console.log(router.asPath);

  const path = router.asPath;
  return (
    <>
      <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={styles.container}>
        <div onClick={handleOpen} className={styles.titleContainer}>
          <span className={styles.materialIcons}>
            {!isOpen ? "menu" : "close"}
          </span>
          <div>Menú</div>
        </div>

        <div onClick={handleClickHome}>
          <Image src={dobleBImg} alt="icon" width={100} height={100} />
        </div>

        <div
          onClick={handleClickLogin}
          className={path === "/login" ? styles.login : styles.noLogin}
        >
          Ingresar
        </div>
      </div>
    </>
  );
}

export default NavBarNotLogged;
