import React, { useState } from 'react'
import AddAppointment from '../../component/Appointment/AddAppointment';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import AppointmentsList from '../../component/Appointment/AppointmentsList';

const Appointments = () => {
    const navigate = useNavigate();





    return (
        <div className='flex flex-col'>

            <div className=' flex flex-row '>
                <div className=' w-8/12 h-96 rounded-lg  backdrop-blur-md bg-black/20  bg-opacity-0 overflow-y-auto  text-white m-10 p-5'>
                <AppointmentsList/>
                </div>
                <div className='w-80 h-32 bg-black/80 text-white m-10'>
                    This is
                </div>
            </div>

           

            <>
                This is appointments
                <button onClick={() => navigate('/appointments/add')} className='btn'>Add Appointment</button>
            </>

            <Outlet />

        </div>
    )


}

export default Appointments;