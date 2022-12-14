// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMalV_deBMB5rsPj-r6GhGhwGJcaXPuHk",
  authDomain: "doble-b.firebaseapp.com",
  projectId: "doble-b",
  storageBucket: "doble-b.appspot.com",
  messagingSenderId: "872239591858",
  appId: "1:872239591858:web:6006c604d7de6eba1cf4ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const user = getAuth(app);

//Update password
const updatePass = async (email) => {
  const auth = getAuth();
  console.log(auth.currentUser);
  sendPasswordResetEmail(auth, email);
};

//Password reset
const passwordReset = async (email) => {
  const auth = getAuth();
  try {
    sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error(error);
  }
};
export { user, updatePass, passwordReset, app };

// <div className={styles.subContainer}>
//   <Image src={whatsappIcon} width={100} height={100} />
//   <button className={styles.wspBtn}>Agendar Turno</button>
//   <div className={styles.addressContainer}>
//     <span className={styles.span}>
//       <i className="fa-solid fa-location-dot fa-xl"></i>
//       Nos encontramos en Savedra 2630, Granadero Baigorria, Santa Fe.
//     </span>
//   </div>
// </div>;

// .subContainer {
//   height: 70vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 5vh;
// }

// .subContainer {
//   text-align: center;
// }

// .wspBtn {
//   padding: 2vh 20vw;
//   font-size: 15px;
//   border: none;
//   border-radius: 10px;
//   background-color: #54d340;
// }

// .span {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 300px;
// }
// .span i {
//   margin-right: 0px;
// }
