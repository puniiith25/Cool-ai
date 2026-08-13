import { useState, useEffect } from "react";
import { UserButton, useClerk, useUser } from '@clerk/clerk-react'
import { ArrowRight } from "lucide-react";
const Navbar = () => {

    const { user } = useUser()
    const { openSignIn } = useClerk()


    return (
        <>
            <div className="fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-5">
                <h1 className="text-2xl font-bold">Cool.ai</h1>
                {
                    user ? <UserButton /> :
                        (<button onClick={openSignIn}
                            className="flex items-center gap-2 text-sm cursor-pointer bg-primary text-white px-10 py-2.5 rounded-full"
                        >
                            Get started <ArrowRight />
                        </button>)
                }

            </div>


        </>
    );
};

export default Navbar;
