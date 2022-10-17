import styles from "../../styles/NavBar.module.css";
import ModalWindow from "../ModalWindow";

function NavBar() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div>Title</div>
          <div>Logo</div>
        </div>

        <div>Menu</div>
        <div>Profile</div>
      </div>
    </>
  );
}

export default NavBar;
