import { useState } from "react"
import toast from 'react-hot-toast'
import { useAuthContext } from "../context/authContext";
import axios from "axios";




const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();



    const logout = async (email, password) => {
        setLoading(true);

        try {
            const res = await axios.post('/auth/logout');
        
    
            const data = res.data;
            //console.log(data.token);
            if (data.error) throw new Error(data.error);

            localStorage.removeItem('auth-user');

            localStorage.removeItem('token');
            setAuthUser(null);
        } catch (error) {
           toast.error(error.message);
        } finally { setLoading(false); }
    }

    return { loading, logout };
}

export default useLogout;