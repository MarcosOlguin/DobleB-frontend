import styles from "../../styles/NavBarNotLogged.module.css";
import { useRouter } from "next/router";
import ModalWindow from "../ModalWindow";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import dobleBImg from "../../public/DobleB2.png";
import Context from "../../context/UserContext";

function NavBarNotLogged() {
  const { jwt } = useContext(Context);
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
    router.push("/");
  };
  const handleClickLogin = () => {
    setDisabled(true);
    router.push("/login");
  };

  const path = router.asPath;

  const handleClickProfile = () => {
    router.push("/profile");
  };
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

        <div className={styles.img} onClick={handleClickHome}>
          <Image src={dobleBImg} alt="icon" width={100} height={100} />
        </div>

        {!jwt ? (
          <div
            onClick={handleClickLogin}
            className={
              path === "/login" || path === "/register"
                ? styles.login
                : styles.noLogin
            }
          >
            Ingresar
          </div>
        ) : (
          <div
            className={path === "/profile" ? styles.onProfile : styles.profile}
            onClick={handleClickProfile}
          >
            Perfil
          </div>
        )}
      </div>
    </>
  );
}

export default NavBarNotLogged;
