import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming Axios is installed

const useGetAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const token= localStorage.getItem('token');

    useEffect(() => {
        const fetchAppointments = async () => {
            setIsLoading(true); // Set loading state to true
            try {
                const response = await axios.get('/doctor/allappoinements',); // Replace with your API endpoint
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            } finally {
                setIsLoading(false); // Set loading state to false (regardless of success/error)
            }
        };

        fetchAppointments();
    }, []); // Empty dependency array ensures fetching only once on component mount

    // ... rest of your component logic and rendering
    return {isLoading, appointments};
};

export default useGetAppointments;
