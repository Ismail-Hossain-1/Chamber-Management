import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';

const Patient = ({ patient }) => {

  const navigate = useNavigate();
  const { setPatientId } = useAuthContext();

  const handleClick = (patientId) => {
    setPatientId(patientId);
    navigate(`/appointments/add?patientId=${patientId}`)
  };
  //console.log('patient ', patient)
  return (
    <div className="flex flex-col border bg-lime-300/40 rounded-lg shadow-md p-4 mb-4 text-white">
      <div className='flex flex-col'>
        <h3 className="text-lg font-medium mb-2">{patient.Name}</h3>
        <ul className="list-none pl-4">
          <li>
            <span className="font-bold mr-2">Patient Address:</span>
            {patient.Address}
          </li>
          <li>
            <span className="font-bold mr-2">Phone:</span>
            {patient.Phone}
          </li>
          <li>
            <span className="font-bold mr-2">Email:</span>
            {patient.Email}
          </li>
          {patient.DateOfBirth && ( // Only display if DateOfBirth exists
            <li>
              <span className="font-bold mr-2">Date of Birth:</span>
              {new Date(patient.DateOfBirth).toLocaleString()}
            </li>
          )}
        </ul>
        </div>

        <button className='btn' onClick={() => handleClick(patient.PatientId)}>ADD Appointment</button>
      </div>
      );
};

      export default Patient;