import React, { useState } from 'react'
import AddAppointment from '../../component/Appointment/AddAppointment';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import AppointmentsList from '../../component/Appointment/AppointmentsList';

const Appointments = () => {
    const navigate = useNavigate();



    

    return (
        <div className='flex flex-col '>

            <div className=' flex flex-row gap-x-5 '>
                <div className={` w-8/12 rounded-lg  backdrop-blur-md bg-black/20  bg-opacity-0 overflow-y-auto  text-white mt-7 mb-3 p-5`} style={{ height: '77vh' }}>
                    <AppointmentsList />
                </div>
                <div className='max-w-96 h-32 bg-black/80 mt-7 mb-3 text-white '>
                    This is and and and and and an lsadkjfalsdjfas fla;sjfl
                </div>
            </div>



            <div>
                
                <button onClick={() => navigate('/appointments/add')} className='btn mb-2 w-full'>Add Appointment</button>
            </div>

            <Outlet />

        </div>
    )


}

export default Appointments;