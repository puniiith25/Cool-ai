import React, { useState } from 'react'
import { assets } from '../assets/assets'

const LogInForm = ({ setShowlogin }) => {

    const [currtState, setcurrState] = useState("Sign Up")
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setdata(data => ({ ...data, [name]: value }))
    }

    const onlogin = (event) => {
        event.preventDefault()

        if (!data.email || !data.password) {
            alert("Please enter all fields")
            return
        }

        alert(currtState === "SignIn"
            ? "Logged In Successfully!"
            : "Account Created Successfully!")

        setShowlogin(false)
    }

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-gradient-to-br from-[#dff4ff] via-[#ffe7f0] to-[#f0e9ff] backdrop-blur-[6px]">

            <form
                onSubmit={onlogin}
                className="w-[min(400px,90%)] min-w-[330px] bg-white/70 text-gray-600 flex flex-col gap-6 p-8 rounded-2xl text-sm shadow-2xl border border-white/40 backdrop-blur-xl"
            >

               
                <div className="flex justify-between items-center text-black">
                    <h2 className="text-2xl font-bold">{currtState}</h2>

                    <img
                        onClick={() => setShowlogin(false)}
                        src={assets.cross_icon}
                        alt=""
                        className="w-6 cursor-pointer hover:opacity-70"
                    />
                </div>

  
                <div className="flex flex-col gap-4">
                    {currtState !== "SignIn" && (
                        <input
                            onChange={onChangeHandler}
                            name="name"
                            value={data.name}
                            type="text"
                            placeholder="Your name"
                            required
                            className="outline-none border border-gray-300 bg-white/60 rounded-xl p-3 focus:ring-2 focus:ring-[#7086E0]"
                        />
                    )}

                    <input
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        type="email"
                        placeholder="Email"
                        required
                        className="outline-none border border-gray-300 bg-white/60 rounded-xl p-3 focus:ring-2 focus:ring-[#7086E0]"
                    />

                    <input
                        name="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        type="password"
                        placeholder="Password"
                        required
                        className="outline-none border border-gray-300 bg-white/60 rounded-xl p-3 focus:ring-2 focus:ring-[#7086E0]"
                    />
                </div>

         
                <button
                    type="submit"
                    className="p-3 rounded-full text-white bg-[#7086E0] text-base cursor-pointer hover:scale-[1.02] transition-all"
                >
                    {currtState === "Sign Up" ? "Create Account" : "Sign In"}
                </button>

          
                <div className="flex items-start gap-2 -mt-2 text-sm">
                    <input type="checkbox" required className="mt-1" />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

               
                <div className="text-sm text-gray-700">
                    {currtState === "SignIn"
                        ? <p>Create Account? <span onClick={() => setcurrState("Sign Up")} className="text-[#7086E0] font-semibold cursor-pointer">Click here</span></p>
                        : <p>Already have an Account? <span onClick={() => setcurrState("SignIn")} className="text-[#7086E0] font-semibold cursor-pointer">Sign In here</span></p>}
                </div>
            </form>
        </div>
    )

}

export default LogInForm
