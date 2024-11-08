import React, { useState } from 'react'
import MakePrescription from '../../component/Prescriptions/MakePrescription';
import PrescriptionList from '../../component/Prescriptions/PrescriptionList';


const Prescriptions = () => {



  return (
    <div>

      <div className='items-center flex flex-col' >
        <h2 className='bg-transparant rounded-md mt-5 p-3 font-bold text-black'>All Prescriptions Ever Issued</h2>
        <PrescriptionList />
      </div>

    </div>
  )
}

export default Prescriptions;