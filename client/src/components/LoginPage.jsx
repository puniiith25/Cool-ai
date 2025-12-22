import React, { useState } from "react";
import { assets } from "../assets/assets";   // change path if needed
import { useAuth } from "../components/AuthContext";

const LogInForm = ({ setShowlogin }) => {

    const { signIn, signUp, googleLogin } = useAuth();

    const [currtState, setcurrState] = useState("Sign Up");
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setdata((prev) => ({ ...prev, [name]: value }));
    };

    const onlogin = async (event) => {
        event.preventDefault();

        try {
            if (currtState === "SignIn") {
                await signIn(data.email, data.password);
                alert("Login Successful 🎉");
            } else {
                await signUp(data.email, data.password);
                alert("Account Created 🎉");
            }

            setShowlogin(false);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-gradient-to-br from-[#dff4ff] via-[#ffe7f0] to-[#f0e9ff] backdrop-blur-[6px]">

            <form
                onSubmit={onlogin}
                className="w-[min(400px,90%)] min-w-[330px] bg-white/70 backdrop-blur-xl shadow-2xl border border-white/40 rounded-2xl p-8 flex flex-col gap-6 text-sm"
            >

                {/* Title */}
                <div className="flex justify-between items-center text-black">
                    <h2 className="text-2xl font-bold">{currtState}</h2>

                    <img
                        onClick={() => setShowlogin(false)}
                        src={assets.cross_icon}
                        alt=""
                        className="w-6 cursor-pointer"
                    />
                </div>

                {/* Inputs */}
                <div className="flex flex-col gap-4">

                    {currtState !== "SignIn" && (
                        <input
                            onChange={onChangeHandler}
                            name="name"
                            value={data.name}
                            type="text"
                            placeholder="Your name"
                            required
                            className="border border-gray-300 bg-white/60 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#7086E0]"
                        />
                    )}

                    <input
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        type="email"
                        placeholder="Email"
                        required
                        className="border border-gray-300 bg-white/60 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#7086E0]"
                    />

                    <input
                        name="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        type="password"
                        placeholder="Password"
                        required
                        className="border border-gray-300 bg-white/60 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#7086E0]"
                    />
                </div>

                {/* Main Button */}
                <button
                    type="submit"
                    className="p-3 rounded-full text-white bg-[#7086E0] text-base cursor-pointer hover:scale-[1.02] transition-all"
                >
                    {currtState === "Sign Up" ? "Create Account" : "Sign In"}
                </button>

                {/* Google Login Button */}
                <button
                    type="button"
                    onClick={async () => {
                        try {
                            await googleLogin();
                            alert("Logged in with Google 🎉");
                            setShowlogin(false);
                        } catch (err) {
                            alert(err.message);
                        }
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-full border bg-white hover:bg-gray-100"
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        className="w-5"
                        alt=""
                    />
                    Continue with Google
                </button>

                {/* Terms */}
                <div className="flex gap-2 text-sm">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {/* Switch */}
                <div className="text-sm text-gray-700 text-center">
                    {currtState === "SignIn" ? (
                        <p>
                            Create Account?{" "}
                            <span
                                onClick={() => setcurrState("Sign Up")}
                                className="text-[#7086E0] font-semibold cursor-pointer"
                            >
                                Click here
                            </span>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <span
                                onClick={() => setcurrState("SignIn")}
                                className="text-[#7086E0] font-semibold cursor-pointer"
                            >
                                Sign In here
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default LogInForm;
