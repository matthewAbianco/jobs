import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDp-g69ax4tU9nQytAOZVcBzAzBC2pCRAg",
    authDomain: "jobs-ea8c0.firebaseapp.com",
    projectId: "jobs-ea8c0",
    storageBucket: "jobs-ea8c0.appspot.com",
    messagingSenderId: "928358671149",
    appId: "1:928358671149:web:4afe4b6887d1736cf469a4"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)