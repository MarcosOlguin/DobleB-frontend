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

const updatePass = async (email) => {
  const auth = getAuth();
  console.log(auth.currentUser);
  sendPasswordResetEmail(auth, email);
};

export { user, updatePass };
