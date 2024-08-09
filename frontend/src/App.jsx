import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { TbLayoutNavbarExpandFilled } from "react-icons/tb";
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
import Profile from './pages/home/Profile';
import Chatbox from './sidebar/chat/Chatbox'
import VoiceAssistant from './pages/home/VoiceAssistant';
import EmailVerificationPage from './pages/auth/EmailVerificationPage';

//const token = localStorage.getItem('token');

axios.defaults.baseURL = 'https://mychamber-backend.vercel.app/api/';
//axios.defaults.headers.common['Authorization'] = token;
//axios.defaults.headers.post['Content-Type'] = 'application/json';

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

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, type: 'sent' }]);
      setInputMessage('');
    }
  };
  const toggleExpanded = () => {
    setIsChatExpanded(!isChatExpanded);
  }

  return (
    <div className=' flex' style={{ position: 'relative' }}>

      {authUser ? <Navbar isloggedin={authUser} /> : ""}

      <div className='h-screen flex-1 '>
        <Routes>
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
          <Route path='/register' element={authUser ? <Navigate to='/' /> : <SignUp />} />

          <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
          <Route path='/appointments' element={authUser ? <Appointments /> : <Navigate to='/login' />} />
          <Route path='/appointments/add' element={<AddAppointment />} />
          <Route path='/appointments/list' element={<AppointmentsList />} />
          <Route path='/appointment/edit/:id' element={<EditableAppointment />} />

          <Route path='/patients' element={authUser ? <Patients /> : <Navigate to='/login' />} />
          <Route path='/patients/add' element={<AddPatient />} />

          <Route path='/prescriptions' element={authUser ? <Prescriptions /> : <Navigate to='/login' />} />
          <Route path='/prescriptions/make' element={authUser ? <MakePrescription /> : <Navigate to='/login' />} />
          <Route path='/profile' element={authUser ? <Profile /> : <Navigate to='/login' />} />
          <Route path='/assistant' element={authUser ? <VoiceAssistant /> : <Navigate to='/login' />} />
          <Route path='/verify-email' element={<EmailVerificationPage />} />
        </Routes>
      </div>

      {authUser && <div className=''>

        <div className='fixed top-5 right-10 z-50'>
          <button
            onClick={toggleExpanded}
            className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md focus:outline-none'
          >
            {isChatExpanded ? <div className='flex flex-row gap-52'>{<TbLayoutSidebarRightCollapseFilled size={22} />}Hide Chat</div> : <div className='flex flex-row gap-3'>{<TbLayoutNavbarExpandFilled size={22} />}Open Chat</div>}
          </button>
        </div>
        {isChatExpanded && (
          <div className='fixed top-14 h-full right-10 bg-white rounded-lg overflow-y-auto border-2 shadow-xl shadow-black-500 border-black'
            style={{
              width: '50vh',
              height: '40vh'
            }}>
            <div className='bg-white p-4  rounded-lg'>
              <Chatbox messages={messages} setMessages={setMessages} handleMessageSubmit={handleMessageSubmit} inputMessage={inputMessage} setInputMessage={setInputMessage} />
            </div>
          </div>
        )}
      </div>}

      <Toaster />
    </div>
  )
}

export default App
