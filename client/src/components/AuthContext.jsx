import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { auth } from "../../src/FirebaseConnection/FireBase";
import { db } from "../../src/FirebaseConnection/FireBase";
import { doc, setDoc, getDoc } from "firebase/firestore";


const authContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Track user
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    // Email Signup
    const signUp = async (email, password) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
            name: res.user.displayName || "User",
            email: res.user.email,
            photo: res.user.photoURL || "",
            createdAt: new Date()
        });

        return res;
    };

    // Email Login
    const signIn = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    // Google Login
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = async () => {
        const res = await signInWithPopup(auth, googleProvider);

        const ref = doc(db, "users", res.user.uid);
        const exists = await getDoc(ref);

        if (!exists.exists()) {
            await setDoc(ref, {
                name: res.user.displayName,
                email: res.user.email,
                photo: res.user.photoURL,
                createdAt: new Date()
            });
        }

        return res;
    };

    // Logout
    const logout = () => signOut(auth);

    return (
        <authContext.Provider value={{ user, signUp, signIn, googleLogin, logout }}>
            {!loading && children}
        </authContext.Provider>
    );
};

// Hook
export const useAuth = () => useContext(authContext);

export default AuthProvider;
