import { useState, useEffect } from "react";
import { useAuth } from "./../components/AuthContext";
import LogInForm from "./LoginPage";

const Navbar = () => {

    const { user, logout } = useAuth();
    const [showLogin, setShowlogin] = useState(false);

    useEffect(() => {
        if (user) setShowlogin(false);
    }, [user]);

    return (
        <>
            <div className="fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-5">

                <h1 className="text-2xl font-bold">Cool.ai</h1>

                {
                    user ? (
                        <div className="flex items-center gap-3">
                            <img
                                src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                className="w-10 h-10 rounded-full border"
                                alt="profile"
                            />

                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-1 rounded-full"
                            >
                                Logout
                            </button>
                        </div>
                    ) :
                        (
                            <button
                                onClick={() => setShowlogin(true)}
                                className="bg-[#7086E0] text-white px-4 py-1 rounded-full"
                            >
                                Login
                            </button>
                        )
                }

            </div>

            {showLogin && <LogInForm setShowlogin={setShowlogin} />}
        </>
    );
};

export default Navbar;
