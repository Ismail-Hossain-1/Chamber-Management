import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';

const Prescription = ({ prescription }) => {
 // console.log('prescription ', prescription.PatientID);
  const utcDate = new Date(prescription.DateIssued);

// Convert UTC to Dhaka local time
utcDate.setHours(utcDate.getHours() + 6); // Adding UTC offset for Dhaka (UTC+6:00)

//console.log(prescription.Email[0])
//prescription.Email.slice(1)
let email= prescription.Email;
  email= '*'+prescription.Email.slice(1)
// Format local time with AM/PM
const localDateIssued = utcDate.toLocaleString('en-BD', { hour12: true });
  return (
    <div>
      <div className='flex flex-col w-full  border bg-white rounded-lg shadow-md p-4 mb-4 text-black' style={{width:'50vw'}}>
        <div>
          <div className='flex flex-row w-full gap-6 p-1 '>
            <h3 className="text-base font-medium mb-2">{prescription.Name}</h3> <p>Date issued: { localDateIssued}</p>
          </div>
          <ul className="list-none pl-1  p-1">
            <li>
              <span className="font-base mr-2">Patient Address:</span>
              {prescription.Address}
            </li>
            <li>
              <span className="font-base mr-2">Email: </span>
              {email}
            </li>
          </ul>
        </div>

        <div className=' pt-2'>
          <PDFDownloadLink
            document={<PDFDocument prescriptionData={[prescription]} instructions={prescription.Instructions} prescriptionNotes={prescription.PrescriptionNotes} />}
            fileName="prescription.pdf"
            className="btn w-full bg-blue-500  text-white pt- py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"

          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download Prescription')}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  )
}

export default Prescription;