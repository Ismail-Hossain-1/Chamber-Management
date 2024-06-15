import React from 'react'
import AddPatient from '../../component/Patients/Addpatient';
import {  useNavigate } from 'react-router-dom';
import PatientList from '../../component/Patients/PatientList';

const Patients = () => {
    const navigate= useNavigate();
    return (
        <div>
            <h1 className='text-white'>Patients</h1>
            <PatientList/>
            
            <button onClick={()=>navigate('/patients/add')} className='btn bg-blue-200 mt-6'>Add Patient</button>
            
        </div>
    )
}

export default Patients;