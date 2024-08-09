import React, { useEffect, useState } from 'react'
import AddPatient from '../../component/Patients/Addpatient';
import { useNavigate } from 'react-router-dom';
import PatientList from '../../component/Patients/PatientList';
import axios from 'axios';
import toast from 'react-hot-toast';

const Patients = () => {
    const navigate = useNavigate();

    const [todo, setTodo] = useState('');

    const handleSave = async () => {
        //alert("Saving")
        //console.log(todo)
        const response = await axios.post('/doctor/pattodo', { pattodo: todo })
       // console.log(response);
        toast.success(response.data)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/doctor/pattodo');
                //console.log(response.data.apptodo)
                if (response.data.pattodo) {
                    setTodo(response.data.pattodo);
                }
            } catch (error) {
                console.error('Error fetching todo:', error);
            }
        };

        fetchData();
    }, []);
    const handleChange = (e) => {

        setTodo(e.target.value)
    }


    return (
        <div className='flex flex-col'>
            

            <div className='flex flex-row gap-5'>
                <div className='w-8/12' style={{ height: "77vh" }}>
                    <PatientList />
                </div>
                <div className='flex-1 flex flex-col mt-7 mb-3 text-black' style={{ width: '100vh' }}>
                    <textarea
                        name='notepadTextArea'
                        id='notepadTextArea'
                        className='w-full h-full bg-white text-black border border-gray-300 rounded-md p-2 resize-none'
                        style={{ fontFamily: 'Consolas, monospace', fontSize: '14px', lineHeight: '1.5' }}
                        placeholder='List your todos, Type here...'
                        value={todo}
                        onChange={handleChange}
                    ></textarea>
                    <button type='button' className='btn mt-3' onClick={handleSave}>Save</button>
                </div>

            </div>

            <button onClick={() => navigate('/patients/add')} className='btn w-full bg-blue-200 mt-6'>Add Patient</button>

        </div>
    )
}

export default Patients;