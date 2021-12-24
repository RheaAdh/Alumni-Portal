import firebase from "firebase";
import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
    apiKey: "AIzaSyBIvspywExiLJFvspK0hSE_Wre-9_nXqDQ",
    authDomain: "alma-mater-323208.firebaseapp.com",
    projectId: "alma-mater-323208",
    storageBucket: "alma-mater-323208.appspot.com",
    messagingSenderId: "651941001502",
    appId: "1:651941001502:web:821aa0b5b3b0ead765f10f",
    measurementId: "G-W0EWKT6GD4",
};

const app = firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export default app;
