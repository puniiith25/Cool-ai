import React from 'react'
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from './AuthContext'

const navItems = [
    { to: '/ai', label: 'Dashboard', Icon: House },
    { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
    { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
    { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-object', label: 'Remove Objects', Icon: Scissors },
    { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
    { to: '/ai/community', label: 'Community', Icon: Users },
]

const Sidebar = ({ Sidebar, setsidebar }) => {

    const { user, logout } = useAuth();

    return (
        <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${Sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>

            {/* Top Section */}
            <div className='my-7 w-full'>
                <img
                    src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt="profile"
                    className='w-14 h-14 rounded-full mx-auto object-cover'
                />

                <h1 className='mt-1 text-center font-medium'>
                    {user?.displayName || "User"}
                </h1>

                <div className='px-6 mt-5 text-sm text-gray-600 font-medium'>
                    {navItems.map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/ai'}
                            onClick={() => setsidebar(false)}
                            className={({ isActive }) =>
                                `px-3.5 py-2.5 flex items-center gap-3 rounded 
                ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                                    {label}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
                <div className='flex gap-4 items-center cursor-pointer'>
                    <img
                        src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                        alt=""
                        className='w-8 h-8 rounded-full object-cover'
                    />
                    <div>
                        <h1 className='text-sm text-gray-600'>
                            {user?.displayName || "User"}
                        </h1>
                        <p className='text-xs text-gray-500'>
                            Premium Plan
                        </p>
                    </div>
                </div>

                <LogOut
                    onClick={logout}
                    className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer'
                />
            </div>
        </div>
    )
}

export default Sidebar
