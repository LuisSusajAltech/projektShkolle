import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  }  from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBnvTRAzKcMJkPO3Qm3o-ILJhtKVWvdfkw",
  authDomain: "school-6b756.firebaseapp.com",
  databaseURL: "https://school-6b756.firebaseio.com",
  projectId: "school-6b756",
  storageBucket: "school-6b756.appspot.com",
  messagingSenderId: "423607813732",
  appId: "1:423607813732:web:b9a5888cec3ff866d00171",
  measurementId: "G-WP6CPZYLK4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const registerWithEmailAndPassword = async (auth, name, surname, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "Users"), {
      uid: user.uid,
      name:name,
      surname:surname,
      authProvider: "harryFultzProjects",
      email:email,
      type:"user",
    });
  } catch (err) {
    console.error(err);
  }
};
export const sendPasswordReset = async (auth, email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("request send");
  } catch (err) {
    console.error(err);
  }
};