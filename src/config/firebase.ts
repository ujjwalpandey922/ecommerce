import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYuXCH55jg18-T8sPdpVOekVDXi3q4azs",
  authDomain: "auth-integration-a6cb9.firebaseapp.com",
  projectId: "auth-integration-a6cb9",
  storageBucket: "auth-integration-a6cb9.appspot.com",
  messagingSenderId: "364192249349",
  appId: "1:364192249349:web:dd9c14c9aa5d6a2683ce6c",
  measurementId: "G-Y54YXFYXX4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
