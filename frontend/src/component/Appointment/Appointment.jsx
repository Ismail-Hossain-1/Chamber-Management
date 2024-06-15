import React from 'react'
import { Link } from 'react-router-dom';

const Appointment = ({ appointment }) => {
  console.log(appointment);
  const { AppointmentDateTime, AppointmentID, DoctorID, Name, Notes, PatientID, Status } = appointment;
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-2">
      <div>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">{Name}</h2>
            <span className="text-sm text-gray-600">ID: {AppointmentID}</span>
          </div>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Appointment Date:</span> {new Date(AppointmentDateTime).toLocaleString()}
          </p>

          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Notes:</span> {Notes}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Status:</span> {Status}
          </p>
        </div>
        <div>
        </div>
        <Link to={`/appointment/edit/${AppointmentID}`}>
          <button className='btn bg-blue-300'>Edit</button>
        </Link>

      </div>
    </div>
  )
}

export default Appointment;