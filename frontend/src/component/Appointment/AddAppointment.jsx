import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';

const AddAppointment = () => {

    const {patientId}= useAuthContext();
   

    if(!patientId){
        toast.error("Select a patient First!");
       return <Navigate to='/patients'/>
       // console.log('Nothing')
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

   
    
    const [formData, setFormData] = useState({
        PatientID: patientId,
        AppointmentDateTime: '',
        Status: '',
        Notes: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/doctor/addappoinment', formData);
           // console.log(response.data); // Log the response for debugging or success handling

            // Handle successful submission (e.g., clear form, show success message)
            setFormData({
                AppointmentDateTime: '', // Clear form fields after successful submission
                Status: '',
                Notes: '',
            });

            toast.success('Appointment added successfully!'); // Show success notification
        } catch (error) {
            console.error('Error adding appointment:', error);
            toast.error('An error occurred. Please try again.'); // Show error notification
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4 ml-16">Appointment Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:w-full md:w-2/3 lg:w-1/2 mx-auto">

                <div>
                    <label htmlFor="AppointmentDateTime" className="block text-sm font-medium text-gray-700">Appointment Date Time</label>
                    <input type="datetime-local" id="AppointmentDateTime" name="AppointmentDateTime" value={formData.AppointmentDateTime} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full md:w-80 lg:w-96" />
                </div>
                <div>
                    <label htmlFor="Status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select id="Status" name="Status" value={formData.Status} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full md:w-80 lg:w-96">
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="Notes" className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea id="Notes" name="Notes" value={formData.Notes} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full h-32 resize-none md:w-80 lg:w-96"></textarea>
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">Submit</button>
                </div>
            </form>
            <Outlet />
        </div>
    );
}

export default AddAppointment;