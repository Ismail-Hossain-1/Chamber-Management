import { createContext, useContext, useState } from "react";
import Navbar from "../sidebar/navigation/NavBar";


export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('auth-user')) || null);
    const [patientId, setPatientId] = useState(null);

    return <AuthContext.Provider value={{ authUser, setAuthUser, patientId, setPatientId }}>
       
        {children}
    </AuthContext.Provider>
}