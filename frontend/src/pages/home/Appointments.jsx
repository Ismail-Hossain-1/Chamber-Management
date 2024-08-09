import React, { useEffect, useState } from 'react'
import AddAppointment from '../../component/Appointment/AddAppointment';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import AppointmentsList from '../../component/Appointment/AppointmentsList';
import axios from 'axios';
import toast from 'react-hot-toast';

const Appointments = () => {
    const navigate = useNavigate();

    const [todo, setTodo] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/doctor/apptodo');
                //console.log(response.data.apptodo)
                if (response.data.apptodo) {
                    setTodo(response.data.apptodo);
                }
            } catch (error) {
                console.error('Error fetching todo:', error);
            }
        };

        fetchData();
    }, []);

    const handleSave = async () => {
        //alert(todo)
        //console.log(todo)
        const response = await axios.post('/doctor/apptodo', { apptodo: todo })
        //console.log(response.data.msg);
        toast.success('Saved')
    }
    const handleChange = (e) => {
        setTodo(e.target.value)
    }



    return (
        <div className='flex flex-col '>

            <div className='flex flex-row gap-x-5'>
                <div className='w-8/12 rounded-lg backdrop-blur-md bg-black/20 bg-opacity-0 overflow-y-auto text-white mt-7 mb-3 p-5' style={{ height: '77vh' }}>
                    <AppointmentsList />
                </div>
                <div className='flex-1 flex flex-col mt-7 mb-3 text-black' style={{ width: '100vh' }}>
                    <textarea
                        name='notepadTextArea'
                        id='notepadTextArea'
                        className='w-full h-full bg-white text-black border border-gray-300 rounded-md p-2 resize-none'
                        style={{ fontFamily: 'Consolas, monospace', fontSize: '14px', lineHeight: '1.5' }}
                        placeholder='Type here...'
                        value={todo}
                        onChange={handleChange}
                    ></textarea>
                    <button type='button' className='btn mt-3' onClick={handleSave}>Save</button>
                </div>
            </div>

            <div >

                <button onClick={() => navigate('/appointments/add')} className='btn mb-2 w-full'>Add Appointment</button>
            </div>

            <Outlet />

        </div>
    )


}

export default Appointments;