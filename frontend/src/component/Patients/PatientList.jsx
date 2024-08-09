import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import Patient from './Patient';
import '../../App.css'

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

  const [searchTerm, setSearchTerm] = useState('');
  const filterSearch = allpatients.filter(patient => {
    return patient.Name.toLowerCase().includes(searchTerm.toLowerCase());
  })
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div style={{ height: '77vh' }}>

      <div className=' flex flex-row  '>
        <div className=' w-full PatientList rounded-lg backdrop-blur-lg bg-opacity-0 overflow-y-auto text-white mt-3 p-10'>
          <div className='pb-4 '>
            <input type="text" value={searchTerm}
              placeholder='Enter Name'
              onChange={handleSearchChange}
              className='input w-full text-stone-600 font-bold' />
          </div>
          <div>
            {isLoading ? <div className='flex flex-col'> Loading Patients ... <span className='loading-spinner loading-lg'></span></div> :
              filterSearch.length > 0 ? filterSearch.map((patient) => (
                <Patient key={patient.PatientId} patient={patient} /> // Pass patient data to Patient component
              )) : <div className='items-center flex flex-col bg-rose-300 m-4 p-4 rounded-md font-bold'><p>No Names Found</p></div>
            }
          </div>

        </div>   
      </div>

    </div>
  )
}

export default PatientList;