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
      <div className='flex flex-col border bg-blue-300/60 rounded-lg shadow-md p-4 mb-4 text-yellow-50'>
        <div>
          <div className='flex flex-row w-full gap-6 bg-gray-600/50 p-1 rounded-md'>
            <h3 className="text-base font-medium mb-2">{prescription.Name}</h3> <p>Date issued: { localDateIssued}</p>
          </div>
          <ul className="list-none pl-4 bg-gray-500/50 p-1 rounded-md">
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

        <div className=''>
          <PDFDownloadLink
            document={<PDFDocument prescriptionData={[prescription]} instructions={prescription.Instructions} prescriptionNotes={prescription.PrescriptionNotes} />}
            fileName="prescription.pdf"
            className="btn w-full bg-sky-800  text-white py-2 px-4 rounded-md hover:bg-blue-600/60 focus:outline-none focus:bg-blue-600"

          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download Prescription')}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  )
}

export default Prescription;