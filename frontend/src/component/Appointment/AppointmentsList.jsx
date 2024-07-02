import React, { useState } from 'react'
import useGetAppointments from '../../hooks/appointments/useGetAppointments';
import Appointment from './Appointment';

const AppointmentsList = () => {
  const { isLoading, appointments } = useGetAppointments();

  // console.log(appointments); // This will now log appointments after they're fetched
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to filter appointments based on search term
  const filteredAppointments = appointments.filter(appointment => {
    // Filter by Name or any other relevant fields
    return appointment.Name.toLowerCase().includes(searchTerm.toLowerCase());
  });



  return (
    <div className='w-full'>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border bg-green-400/70 border-gray-300 rounded-md p-2 w-full text-white font-bold"
        />
      </div>
      {isLoading ? (
        <p>Loading appointments...</p>
      ) : (
        <ul>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <li key={appointment.AppointmentID}>
                <Appointment appointment={appointment} />
              </li>
            ))
          ) : (
            <p>No appointments found.</p>
          )}
        </ul>
      )}
    </div>
  );
};


export default AppointmentsList;