import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function useSignup() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();



    const signup = async (formData, navigate) => {
        //console.log("formData ", formData);
        const { name, registration, speciality, qualifications, phone,
            email, password, address, clinicAddress, availability, fees } = formData;
        const success = handleError(formData.password);
        if (!success) return;


        setLoading(true);
        try {
            const response = await axios.post('/auth/register',{
                    name, registration, speciality, qualifications, phone,
                    email, password, address, clinicAddress, availability, fees
                });
            const emailVerify = await axios.post('/send-verification', { email: email })
            console.log(emailVerify)
            //const data = await response.json();
            const data= response.data;
            if (data.error) {
                throw new Error(data.error);
            }

            navigate('/login')
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, signup };
};



const handleError = (password) => {
    console.log("pass :", password)
    if (password.length < 6) {
        toast.error("Password must have at least 6 characters");
        return false;
    }
    return true;

}

export default useSignup;