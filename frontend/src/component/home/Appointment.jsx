import React from 'react'
import '../../App.css'

const Appointment = ({appointment}) => {
    // console.log(appointment);
    // console.log(appointment.Name)
    //console.log(appointment)
    const homeAppBg= appointment.Status=='done'? 'bg-green-400': 'bg-blue-100'
    return (
        <div className='box-content'>
            <div className={`${homeAppBg} border border-blue-500 rounded-lg p-4 mb-2  `}>
                <h2 className="text-xl font-bold mb-1">{appointment.Name}</h2>
                <p className="text-gray-700 mb-1">Address: {appointment.Address}</p>
                <p className="text-gray-700">Age: {appointment.Age}</p>
            </div>
        </div>
    )
}

export default Appointment