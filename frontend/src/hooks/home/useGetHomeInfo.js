import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/authContext';
import axios from 'axios';

const useGetHomeInfo = () => {

    const [todayApppointments, setTodayApppointments] = useState([]);
    const [statistics, setStatistics] = useState([[]]);
    const token = localStorage.getItem('token');
    const { authUser } = useAuthContext();

    const [isloadingAppointments, setIsloadingAppointments] = useState(false);
    const [isloadingStatistics, setIsloadingStatistics] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            if (!authUser || !authUser.token) {
                return; // Handle case where authUser or token is not available
            }
            try {
                setIsloadingAppointments(true);
                const resAppointments = await axios.get('/doctor/appointmentstoday');
                setTodayApppointments(resAppointments.data);

                setIsloadingStatistics(true);
                const resStatistics = await axios.get('/doctor/patientsrange');
                setStatistics(resStatistics.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsloadingAppointments(false);
                setIsloadingStatistics(false);
            }
        };
        fetchData()

    }, []);

    return {isloadingAppointments, todayApppointments, isloadingStatistics,statistics }
}

export default useGetHomeInfo;