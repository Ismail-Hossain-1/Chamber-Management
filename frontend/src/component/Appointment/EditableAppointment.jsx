import React, { useState } from 'react';

const EditableAppointment = ({ appointment, onSave }) => {
  const [editedAppointment, setEditedAppointment] = useState({ ...appointment });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAppointment({ ...editedAppointment, [name]: value });
  };

  const handleSave = () => {
    onSave(editedAppointment);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-20">
      <div className="px-6 py-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="Name"
            value={editedAppointment.Name }
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
            Notes
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="notes"
            name="Notes"
            value={editedAppointment.Notes}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            name="Status"
            value={editedAppointment.Status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditableAppointment;
