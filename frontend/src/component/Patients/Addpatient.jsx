import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddPatient = () => {
    const [patient, setPatient] = useState({
        Name: '',
        Age: '',
        DateOfBirth: '',
        Email: '',
        Phone: '',
        Address: ''
    });
    // const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(patient);

        try {
            const response = await axios.post(
                'http://localhost:3000/api/doctor/addpatient',
                { patient }

            );
            console.log(response.data);
            toast.success(response.data.message);
            setPatient({
                Name: '',
                Age: '',
                DateOfBirth: '',
                Email: '',
                Phone: '',
                Address: ''
            })
        } catch (error) {
            console.error('Error adding patient:', error);
            toast.error(error);
        }
    };

    return (
        <div className="max-w-full p-10 mx-auto mt-6  backdrop-blur-lg bg-opacity-0 ">
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        required
                        value={patient.Name}
                        onChange={(e) => setPatient({ ...patient, Name: e.target.value })}
                        className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="age" className="block text-gray-700">Age</label>
                    <input
                        type="text"
                        required
                        value={patient.Age}
                        onChange={(e) => setPatient({ ...patient, Age: e.target.value })}
                        className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="DateOfBirth" className="block text-gray-700">Date Of Birth</label>
                    <input
                        type="date"
                        value={patient.DateOfBirth}
                        onChange={(e) => setPatient({ ...patient, DateOfBirth: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={patient.Email}
                        onChange={(e) => setPatient({ ...patient, Email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-gray-700">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        value={patient.Phone}
                        onChange={(e) => setPatient({ ...patient, Phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-gray-700">Address</label>
                    <textarea
                        id="address"
                        required
                        value={patient.Address}
                        onChange={(e) => setPatient({ ...patient, Address: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Add Patient
                </button>
            </form>
        </div>
    );
};

export default AddPatient;
