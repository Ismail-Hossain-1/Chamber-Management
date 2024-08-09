import { useState } from "react"
import toast from 'react-hot-toast'
import { useAuthContext } from "../context/authContext";
import axios from "axios";




const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();



    const login = async (email, password) => {
        setLoading(true);

        try {
            const res = await axios.post('/auth/login', { email, password });


            // const data = await res.json();
            const data = res.data;

            //console.log(data.token);
            if (data.error) throw new Error(data.error);

            localStorage.setItem('auth-user', JSON.stringify(data));

            localStorage.setItem('token', data.token);
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally { setLoading(false); }
    }

    return { loading, login };
}

export default useLogin;