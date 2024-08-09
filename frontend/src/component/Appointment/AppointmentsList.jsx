import React, { useState } from 'react'
import useGetAppointments from '../../hooks/appointments/useGetAppointments';
import Appointment from './Appointment';

const AppointmentsList = () => {
  const { isLoading, appointments } = useGetAppointments();




  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredAppointments = appointments.filter(appointment => {
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
          className="border bg-emerald-300 border-gray-300 rounded-md p-2 w-full text-white font-bold"
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