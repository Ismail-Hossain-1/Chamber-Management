import React from 'react';
import { useAuthContext } from '../../context/authContext';

const Profile = () => {
    // Sample data (replace with actual data from your API or state)
    const { authUser } = useAuthContext()
    const profileData = authUser.user;

    return (
        <div
            className="h-screen w-full bg-gray-200 flex relative justify-center items-center mb-0"
        >
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Profile Information</div>
                <ul>
                    {Object.entries(profileData).map(([key, value]) => (
                        <li key={key} className="flex justify-between items-center bg-gray-100 rounded-lg p-1 mb-2">
                            <span className="text-gray-600 font-medium ">{key}:</span>
                            <span className="text-gray-900">{value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
