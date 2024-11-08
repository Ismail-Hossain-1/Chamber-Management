import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import Prescription from './Prescription'
const PrescriptionList = () => {

  const [allprescriptions, setAllprescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const getPrescriptions = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await axios.get('/doctor/allprescriptions'); // Replace with your API endpoint
        //console.log(response)
        setAllprescriptions(response.data);
      } catch (error) {
        toast.error('Error fetching Prescriptions:', error);
      } finally {
        setIsLoading(false); // Set loading state to false (regardless of success/error)
      }
    };

    getPrescriptions();
  }, [])
  //console.log(allprescriptions)
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to filter appointments based on search term
  const filteredPrescriptions = allprescriptions.filter(prescription => {
    // Filter by Name or any other relevant fields
    return prescription.Name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='flex flex-col PatientList rounded-lg backdrop-blur-lg  bg-opacity-0 overflow-y-auto text-white m-5 pt-2 pl-16 pr-16' style={{ height: '85vh',  }}>
      <div className=''>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border bg-white border-gray-300 rounded-md p-2 w-full text-gray-700 font-semibold"
        />
      </div>

      <div className=''>
        {isLoading ? (
          <p>Loading Prescriptions...</p>
        ) : (
          <ul>
            {filteredPrescriptions.length > 0 ? (
              filteredPrescriptions.map((prescription) => (
                <li key={prescription.PrescriptionID}>
                  <Prescription prescription={prescription} />
                </li>
              ))
            ) : (
              <p className='font-bold bg-yellow-500 rounded p-2'>No Prescriotions found.</p>
            )}
          </ul>
        )}
      </div>
      </div>
    </div>
  )
}

export default PrescriptionList;