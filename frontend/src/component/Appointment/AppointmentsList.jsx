import React from 'react'
import useGetAppointments from '../../hooks/appointments/useGetAppointments';
import Appointment from './Appointment';

const AppointmentsList = () => {
  const { isLoading, appointments } = useGetAppointments();

 // console.log(appointments); // This will now log appointments after they're fetched

  return (
    <div className='w-full'>
      {isLoading ? (
        <p>Loading appointments...</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.AppointmentID}>
              {<Appointment appointment={appointment}/>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default AppointmentsList;