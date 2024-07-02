import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import Logout from './Logout';


const Navbar = ({ isloggedin }) => {
    const [nav, setNav] = useState(false);

    const handleLogout=()=>{
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
        <div className={`lg:w-48 sm:w-32 flex flex-col justify-between p-4 shadow-sm ${!nav ? 'fixed left-10 top-0 z-10' : ''}`}>

            <div className="flex ">
                <div onClick={() => setNav(!nav)} className={`cursor-pointer text-white bg-white/30  ${nav? "hidden":""} `}>
                    <AiOutlineMenu size={30} />
                </div>
            </div>

            {nav ? (
                <div className="fixed rounded-sm h-screen z-10 top-0 left-0"></div>
            ) : (
                ""
            )}


            <div
                className={
                    nav
                        ? "fixed top-14 left-0 w-48 h-screen rounded bg-white z-10 duration-300 backdrop-filter backdrop-blur-sm bg-opacity-0"
                        : "fixed top-10 left-[-100%] w-48 rounded-md h-screen bg-white z-10 duration-300"
                }
            >
                <AiOutlineClose
                    onClick={() => setNav(!nav)}
                    size={30}
                    className="absolute right-4 top-4 cursor-pointer text-white/70"
                />

               <div className='box-content bg-slate-300 pb-10'> <h1 className='pt-20 pl-20'>{isloggedin.user.Name}</h1></div>

                <nav className='mt-8 ml-4 mb-4 flex flex-col p-10 text-wrap text-orange-100 font-bold'>
                    <Link to='/' className='mb-4 ' >Dashboard</Link>
                    <Link to='/appointments' className='mb-4 '>Appointments</Link>
                    <Link to='/patients' className='mb-4 '>Patients</Link>
                    <Link to='/prescriptions' className='mb-4 '>Prescriptions</Link>
                </nav>

                <Logout/>
            </div>
           
        </div>
    );
};

export default Navbar;
