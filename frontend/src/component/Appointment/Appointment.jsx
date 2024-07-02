import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Appointment = ({ appointment }) => {
 // console.log(appointment);
  const { AppointmentDateTime, AppointmentID, DoctorID, Name, Notes, PatientID, Status } = appointment;


  const [editableAppointment, setEditableAppointment] = useState(appointment);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableAppointment({
      ...editableAppointment,
      [name]: value
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    // Reset editableAppointment to original appointment data
    setEditableAppointment(appointment);
    setIsEditing(false);
  };

  const appointmentBg = appointment.Status === 'pending' ? 'bg-red-200' : 'bg-green-200';
  const handleSaveEdit = async () => {
    try {
      const { Notes, Status } = editableAppointment;
      // Make the API call to save changes
      const response = await axios.put('/doctor/updateappointment', { Notes, Status, AppointmentID });
  
      // Optimistically update local state
      if (response.status === 200) {
        // Update local editableAppointment with new Notes and Status
        setEditableAppointment(prevState => ({
          ...prevState,
          Notes,
          Status
        }));
  
        // Notify user of success
        toast.success('Appointment updated successfully');
      } else {
        toast.error('Failed to update appointment');
      }
  
      // Exit edit mode regardless of success/failure
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('Failed to update appointment');
      // Reset editableAppointment to original appointment data on error
      setEditableAppointment(appointment);
    }
  };
  

  

  return (
    <div className={`${appointmentBg} shadow-lg rounded-lg overflow-hidden m-2`}>
      <div>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">{editableAppointment.Name}</h2>
            <span className="text-sm text-gray-600">ID: {editableAppointment.AppointmentID}</span>
          </div>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Appointment Date:</span> {new Date(editableAppointment.AppointmentDateTime).toLocaleString()}
          </p>

          {isEditing ? (
            <>
              <div className="mb-2">
                <label htmlFor="notes" className="font-semibold">Notes:</label>
                <textarea
                  id="notes"
                  name="Notes"
                  value={editableAppointment.Notes}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 h-10 text-gray-500 rounded-md p-2 mt-1"
                />
              </div>
              <div className="mb-2 text-gray-600">
                <label htmlFor="status" className="font-semibold">Status:</label>
                <select
                  id="status"
                  name="Status"
                  value={editableAppointment.Status}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md p-2 mt-1"
                >
                  <option value="pending">Pending</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSaveEdit}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-400 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Notes:</span> {editableAppointment.Notes}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Status:</span> {editableAppointment.Status}
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleEditClick}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Appointment;

// //  <Link to={`/appointment/edit/${AppointmentID}`}>
// <button className='btn bg-blue-300'>Edit</button>
// </Link>