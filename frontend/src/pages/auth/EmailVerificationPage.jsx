import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function EmailVerificationPage() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get('token');
   // console.log("token: ", token);
    useEffect(() => {
        if (token) {
            axios.get(`/verify-email?token=${token}`)
                .then(response => {
                   // console.log(response.data);
                    toast.success(response.data)
                    
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [token]);

    return (
        <div>
            {/* Render a loading or success message here */}
            <p className='p-5 m-5 bg-amber-300 rounded text-white text-2xl'>Verification Done</p>
        </div>
    );
}

export default EmailVerificationPage;
