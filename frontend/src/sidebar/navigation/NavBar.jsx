import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import Logout from './Logout';


const Navbar = ({ isloggedin }) => {
    const [nav, setNav] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('auth-user');
    }

    //console.log(isloggedin);
    useEffect(() => {
        const checkScreenSize = () => {
            return window.innerWidth > 768; // Adjust the threshold as needed for your mobile layout
        };
        setNav(checkScreenSize());
        const handleResize = () => {
            setNav(checkScreenSize());
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    //console.log(isloggedin);

    return (
        <div className={`lg:w-48 sm:w-32 flex flex-col justify-between p-4 shadow-sm ${!nav ? 'fixed left-0 top-0 z-10' : ''}`}>

            <div className="flex ">
                <div onClick={() => setNav(!nav)} className={`cursor-pointer text-white bg-white/30  ${nav ? "hidden" : ""} `}>
                    <AiOutlineMenu size={30} />
                </div>
            </div>

            {nav ? (
                <div className="fixed rounded-sm h-screen z-0 top-0 left-0"></div>
            ) : (
                ""
            )}


            <div
                className={
                    nav
                        ? "fixed top-0 left-0 h-screen rounded bg-white text-black z-10 duration-300 backdrop-filter backdrop-blur-sm "
                        : "fixed top-10 left-[-100%] w-48 rounded-md h-screen bg-white z-10 duration-300"
                }
            >
                <AiOutlineClose
                    onClick={() => setNav(!nav)}
                    size={30}
                    className="absolute right-0 top-12 cursor-pointer text-white"
                />

                <div className="box-content bg-slate-300 pb-10">
                    <p className="text-xl text-center font-serif font-bold text-gray-800 mb-2 pt-2" style={{ fontFamily: '"Lucida Handwriting", cursive' }}>My Chamber</p>
                    <h1 className="text-lg text-center text-gray-700">{isloggedin.user.Name}</h1>
                </div>

                <nav className='mt-8 mb-4 flex flex-col justify-center p-10 text-wrap text-black font-bold w-full'>
                    <Link to='/' className='mb-4  bg-[#CBD5E1] rounded p-1 px-5' >Dashboard</Link>
                    <Link to='/appointments' className='mb-4 bg-[#CBD5E1] rounded p-1 px-5 text-wrap'>Appointments</Link>
                    <Link to='/patients' className='mb-4 bg-[#CBD5E1] rounded p-1 px-5'>Patients</Link>
                    <Link to='/prescriptions' className='mb-4 bg-[#CBD5E1] rounded p-1 px-5'>Prescriptions</Link>
                    <Link to='/profile' className='mb-4 bg-[#CBD5E1] rounded p-1 px-5'>Profile</Link>
                    <Link to='/assistant' className='mb-4 bg-[#CBD5E1] rounded p-1 px-5'>Assistant</Link>
                </nav>

                <div className='items-center bottom-10 ml-6 bg-[#CBD5E1] m-3 p-1 w-2/12 rounded'> <Logout /> </div>
            </div>

        </div>
    );
};

export default Navbar;
