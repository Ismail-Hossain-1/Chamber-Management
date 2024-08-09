import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

function SignUp() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: '',
        registration: '',
        speciality: '',
        qualifications: '',
        phone: '',
        email: '',
        password: '',
        address: '',
        clinicAddress: '',
        availability: '',
        fees: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const { loading, signup } = useSignup();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(userInfo);
        await signup(formData,navigate);
        setFormData({
            name: '',
            registration: '',
            speciality: '',
            qualifications: '',
            phone: '',
            email: '',
            password: '',
            address: '',
            clinicAddress: '',
            availability: '',
            fees: '',
        });
    }


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-2 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
                <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Register your details</h2>
            </div>

            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="grid grid-cols-2 gap-x-4 gap-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <div className="mt-1 rounded-lg">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-field bg-slate-400 p-2 rounded-lg"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="registration" className="block text-sm font-medium text-gray-700">
                                Registration
                            </label>
                            <div className="mt-1 rounded-lg">
                                <input
                                    id="registration"
                                    name="registration"
                                    type="text"
                                    required
                                    value={formData.registration}
                                    onChange={handleChange}
                                    className="input-field bg-slate-400 p-2 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="speciality" className="block text-sm font-medium text-gray-700">
                                Speciality
                            </label>
                            <div className="mt-1">
                                <input
                                    id="speciality"
                                    name="speciality"
                                    type="text"
                                    required
                                    value={formData.speciality}
                                    onChange={handleChange}
                                    className="input-field  bg-slate-400 p-2 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700">
                                Qualifications
                            </label>
                            <div className="mt-1">
                                <input
                                    id="qualifications"
                                    name="qualifications"
                                    type="text"
                                    required
                                    value={formData.qualifications}
                                    onChange={handleChange}
                                    className="input-field  bg-slate-400 p-2 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <div className="mt-1">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="input-field  bg-slate-400 p-2 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input-field  bg-slate-400 p-2 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input-field  bg-slate-400 p-2 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="input-field  bg-slate-400 p-2 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="clinicAddress" className="block text-sm font-medium text-gray-700">
                                Clinic Address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="clinicAddress"
                                    name="clinicAddress"
                                    type="text"
                                    required
                                    value={formData.clinicAddress}
                                    onChange={handleChange}
                                    className="input-field  bg-slate-400 p-2 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                                Availability
                            </label>
                            <div className="mt-1">
                                <input
                                    id="availability"
                                    name="availability"
                                    type="text"
                                    required
                                    value={formData.availability}
                                    onChange={handleChange}
                                    className="input-field  bg-slate-400 p-2 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="fees" className="block text-sm font-medium text-gray-700">
                                Fees
                            </label>
                            <div className="mt-1">
                                <input
                                    id="fees"
                                    name="fees"
                                    type="text"
                                    required
                                    value={formData.fees}
                                    onChange={handleChange}
                                    className="input-field  bg-slate-400 p-2 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="col-span-2 flex items-center justify-between">
                            <div className="text-sm">
                                <Link to="/login" className="text-sm text-gray-600 hover:underline hover:text-blue-500 mt-4 inline-block">
                                    Already have an account?
                                </Link>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <button className="btn btn-block btn-circle mt-3 bg-blue-400" disabled={loading}>
                                {loading ? <span className='loading loading-spinner'></span> : 'Register'}

                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;

{/* <Link to="/login" className="text-sm text-gray-600 hover:underline hover:text-blue-500 mt-4 inline-block">
                            Already have an account?
                        </Link>
                    </div>

                    <div>
                        <button className="btn btn-block btn-circle mt-3" disabled={loading}>
                           {loading ? <span className='loading loading-spinner'></span> : 'Sign Up'}

                        </button> */}