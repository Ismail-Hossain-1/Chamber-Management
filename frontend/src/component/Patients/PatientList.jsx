import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import Patient from './Patient';

const PatientList = () => {

  const [allpatients, setAllpatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const token = localStorage.getItem('token');
  

  useEffect(() => {
    const getAppointments = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await axios.get('/doctor/allpatients'); // Replace with your API endpoint
        setAllpatients(response.data);
      } catch (error) {
        toast.error('Error fetching appointments:', error);
      } finally {
        setIsLoading(false); // Set loading state to false (regardless of success/error)
      }
    };

    getAppointments();
  }, [token]);

  //console.log(allpatients);


  return (
    <div>

      PatientList

      <div className=' flex flex-row  '>
        <div className=' w-10/12 h-96 rounded-lg backdrop-blur-lg bg-opacity-0 overflow-y-auto text-white m-10 p-10'>
          {allpatients.map((patient) => (
            <Patient key={patient.PatientId} patient={patient} /> // Pass patient data to Patient component
          ))}

        </div>


        <div className='w-80 h-32 bg-black/80 text-white m-10'>
          This is
        </div>
      </div>

    </div>
  )
}

export default PatientList;