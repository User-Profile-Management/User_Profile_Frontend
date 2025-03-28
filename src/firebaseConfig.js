
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCHVgekPc7AP9KInrrQaN1JCt6Cuj_3d0Q",
    authDomain: "usermanagementsystem-31df5.firebaseapp.com",
    projectId: "usermanagementsystem-31df5",
    storageBucket: "usermanagementsystem-31df5.firebasestorage.app",
    messagingSenderId: "643356885431",
    appId: "1:643356885431:web:b29d24fa7e70c7e51ae832",
    measurementId: "G-STKGRW1D05"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
