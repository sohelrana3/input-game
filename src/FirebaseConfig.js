// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq6iYqquKEPw9errIS1raKaFXJBASjysg",
  authDomain: "input-counter.firebaseapp.com",
  projectId: "input-counter",
  storageBucket: "input-counter.appspot.com",
  messagingSenderId: "526613127438",
  appId: "1:526613127438:web:b586f32fce8a99f81e775f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig