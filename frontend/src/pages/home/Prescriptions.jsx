import React, { useState } from 'react'
import MakePrescription from '../../component/Prescriptions/MakePrescription';
import PrescriptionList from '../../component/Prescriptions/PrescriptionList';


const Prescriptions = () => {



  return (
    <div>

      <div className='items-center flex flex-col' >
        <h2 className='bg-lime-400 rounded-md mt-5 p-5 font-bold text-indigo-800'>All Prescriptions Ever Issued</h2>
        <PrescriptionList />
      </div>

    </div>
  )
}

export default Prescriptions;