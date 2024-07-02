import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import axios from 'axios'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './sidebar/navigation/NavBar'
import { useAuthContext } from './context/authContext'
import Appointments from './pages/home/Appointments'
import Prescriptions from './pages/home/Prescriptions'
import Patients from './pages/home/Patients'
import AddAppointment from './component/Appointment/AddAppointment'
import AppointmentsList from './component/Appointment/AppointmentsList'
import AddPatient from './component/Patients/Addpatient'
import MakePrescription from './component/Prescriptions/MakePrescription'
import EditableAppointment from './component/Appointment/EditableAppointment'

//const token = localStorage.getItem('token');

axios.defaults.baseURL = 'http://localhost:3000/api/';
//axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  const { authUser } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [authUser]);



  return (
    <div className=' flex'>

      {authUser ? <Navbar isloggedin={authUser} /> : ""}
      <div className='h-screen '>
        <Routes>
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
          <Route path='/register' element={authUser ? <Navigate to='/' /> :  <SignUp/>} />

          <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
          <Route path='/appointments' element={authUser ? <Appointments /> : <Navigate to='/login' />} />
          <Route path='/appointments/add' element={<AddAppointment />} />
          <Route path='/appointments/list' element={<AppointmentsList />} />
          <Route path='/appointment/edit/:id' element={<EditableAppointment/>} />

          <Route path='/patients' element={authUser ? <Patients /> : <Navigate to='/login' />} />
          <Route path='/patients/add' element={<AddPatient />} />

          <Route path='/prescriptions' element={authUser ? <Prescriptions /> :<Navigate to='/login' />} />
          <Route path='/prescriptions/make' element={authUser ? <MakePrescription /> :<Navigate to='/login' />}/>
        </Routes>
      </div>
      <Toaster />
    </div>
  )
}

export default App
