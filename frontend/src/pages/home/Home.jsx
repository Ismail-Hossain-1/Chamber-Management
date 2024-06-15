import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/authContext'
import toast from 'react-hot-toast';
import axios from 'axios';
import Appointment from '../../component/home/Appointment';
import { Chart } from "react-google-charts";

const Home = () => {

  const { authUser } = useAuthContext();

  const [isloading, setIsloading] = useState(false);
  const [todayApppointments, setTodayApppointments] = useState([]);
  const [statistics, setStatistics] = useState([[]]);
  const token = localStorage.getItem('token');

  const [isloadingAppointments, setIsloadingAppointments] = useState(false);
  const [isloadingStatistics, setIsloadingStatistics] = useState(false);


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsloadingAppointments(true);
        const res = await axios.get('/doctor/appointmentstoday');
        setTodayApppointments(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsloadingAppointments(false);
      }
    };

    const fetchStatistics = async () => {
      try {
        setIsloadingStatistics(true);
        const res = await axios.get('/doctor/patientsrange');
        setStatistics(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsloadingStatistics(false);
      }
    };

    fetchAppointments();
    fetchStatistics();

  },[]);

  const [searchQuery, setSearchQuery] = useState('');
  const filteredAppointments = todayApppointments.filter(appointment =>
    appointment.Name.toLowerCase().includes(searchQuery.toLowerCase()),
    
  );

  console.log(statistics);

  const chartData = [['Age Range', 'Count'], ...statistics.map(item => [item.age_range, item.count])];

  const options = {
    title: "My Patients Statistics",
    is3D: true,
    backgroundColor: {
      fill: 'transparent'
    }

  };

  return (
    <div className='flex flex-col items-center ' >
      <div className='flex flex-row gap-4'>

        <div className="flex flex-col backdrop-filter overflow-y-auto Appointment
            backdrop-blur-lg bg-opacity-0 rounded-md shadow-md bg-gray-200 p-4">
          <h1 className=" text-lg font-semibold  mb-4">Today's Appointments</h1>
          <input
            type="text"
            placeholder="Search Name"
            className="mb-4 p-2 border border-gray-400 rounded-md"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {isloadingAppointments ? (
            <div className="flex items-center justify-center">
              <span className="loading loading-spinner"></span>
            </div>
          ) : (
            filteredAppointments.length === 0 ? (
              <p className="text-2xl text-green-100 font-mono m-3 ">You don't have any Appointments Today</p>
            ) : (
              filteredAppointments.map(appointment => (
                <div key={appointment.id} className="mb-2">
                  <Appointment appointment={appointment} />
                  
                </div>
              ))
            )
          )}
        </div>



        <div className='flex flex-row backdrop-filter
            backdrop-blur-lg bg-opacity-0 right-11 absolute'>

          <Chart
            chartType="PieChart"
            data={chartData}
            options={options}
            width={"100%"}
            height={"400px"}

          />

        </div>

      </div>





    </div >
  )
}

export default Home;

/*

Appointment Overview: Display a summary of upcoming appointments, including today's appointments,
 upcoming appointments for the week or month, and any overdue appointments. Allow doctors to view details and manage appointments
  directly from the dashboard.

Patient Statistics: Provide statistics and insights about patient demographics,
 such as the total number of patients, new patients, returning patients, age distribution, 
 and common medical conditions. This information can help doctors understand their patient population better.

Recent Activities: Show a log of recent activities, such as appointments scheduled, 
prescriptions issued, medical records updated, and billing transactions. This helps doctors stay
 informed about recent events and track their interactions with patients.

Financial Overview: Include a summary of financial metrics, such as revenue generated,
 outstanding invoices, payments received, and expenses incurred. Provide visualizations
  like charts or graphs to visualize financial trends over time.

Quick Links: Offer quick access to commonly used features and functionalities, 
such as creating new appointments, adding new patients, accessing patient records, 
managing prescriptions, and generating invoices. This helps doctors navigate the application more efficiently.

Notifications and Reminders: Display notifications and reminders for important events, 
such as upcoming appointments, pending tasks, overdue payments, and system updates.
 Allow doctors to acknowledge or dismiss notifications directly from the dashboard.

Task List or To-Do List: Provide a list of tasks or to-do items for doctors to prioritize and manage their workload effectively.
 Allow doctors to mark tasks as complete, set due dates, and add new tasks as needed.

Health Tips or Educational Resources: Share health tips, educational resources,
 or articles related to common medical conditions, preventive care, and lifestyle recommendations.
  This can help patients stay informed and engaged in their healthcare journey.



*/