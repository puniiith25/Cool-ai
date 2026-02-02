
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA7OfkGuU8hz_0FGe0apOiUS4jqhFpyysk",
    authDomain: "cool-ai-96504.firebaseapp.com",
    projectId: "cool-ai-96504",
    storageBucket: "cool-ai-96504.firebasestorage.app",
    messagingSenderId: "596802127120",
    appId: "1:596802127120:web:a048554e8192832cc49195",
    measurementId: "G-CJ3LCQMR5Z"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);