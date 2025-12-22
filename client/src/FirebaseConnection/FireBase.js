// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7OfkGuU8hz_0FGe0apOiUS4jqhFpyysk",
    authDomain: "cool-ai-96504.firebaseapp.com",
    projectId: "cool-ai-96504",
    storageBucket: "cool-ai-96504.firebasestorage.app",
    messagingSenderId: "596802127120",
    appId: "1:596802127120:web:a048554e8192832cc49195",
    measurementId: "G-CJ3LCQMR5Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);