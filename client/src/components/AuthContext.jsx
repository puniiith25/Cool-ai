import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext();

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
    const signUp = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    // Email Login
    const signIn = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    // Google Login
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => signInWithPopup(auth, googleProvider);

    // Logout
    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, googleLogin, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
