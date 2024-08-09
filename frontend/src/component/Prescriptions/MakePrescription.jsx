import React, { useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const MakePrescription = () => {

    const {patientId}= useAuthContext();
    //console.log(patientId); 
    const [prescriptionData, setPrescriptionData] = useState([
        {
            MedicationName: '',
            Dosage: '',
            Frequency: '',
            Duration: '',
            Status: '',
            Instructions: '',
            PrescriptionNotes: '',
        },
    ]);

    //const [data, setData]= useState([prescriptionData]);

    const handleInputChange = (e, index, name) => {
        const { value } = e.target;
        setPrescriptionData(prevState => {
            const newData = [...prevState];
            newData[index][name] = value;
            return newData;
        });
    };

    const handleAddDose = () => {
        setPrescriptionData(prevState => [
            ...prevState,
            {
                MedicationName: '',
                Dosage: '',
                Frequency: '',
                Duration: '',
                Status: '',
            },
        ]);
    };


    const handleDownloadPDF = () => {
        setIsGeneratingPDF(true);
        // Simulate some delay (optional)
        setTimeout(() => setIsGeneratingPDF(false), 1000); // 1 second delay
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       // console.log(prescriptionData);

        try {
            const res = await axios.post('/doctor/makeprescription', {
                PatientID: patientId,
                PrescriptionData: prescriptionData,
                Instructions: prescriptionData[0].Instructions,
                PrescriptionNotes: prescriptionData[0].PrescriptionNotes
            });
            //console.log(res.data);
            toast.success(res.data.message);
        } catch (error) {
            console.error('Error making prescription:', error);
            toast.error(error.message);
        }
    };

    const navigate= useNavigate();
    if(!patientId){
        
        useEffect(()=>{ navigate('/appointments')},[]);
        return(
             toast.error('No patient Selected')
             
            )
        
    }
    return (

        <div className="max-w-full rounded pr-10 mx-auto mt-8 bg-clip-padding bg-gray-600/60 backdrop-filter backdrop-blur-lg bg-opacity-0">
            <form onSubmit={handleSubmit} className="space-y-4 p-5 m-5 rounded-lg">
                <table className="w-full rounded-lg">
                    <thead>
                        <tr className="bg-green-300">
                            <th className="border border-gray-400 px-4 py-2">Medication Name</th>
                            <th className="border border-gray-400 px-4 py-2">Dosage</th>
                            <th className="border border-gray-400 px-4 py-2">Frequency</th>
                            <th className="border border-gray-400 px-4 py-2">Duration</th>
                            <th className="border border-gray-400 px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prescriptionData.map((dose, index) => (
                            <tr key={index}>
                                <td className="border border-gray-400 px-4 py-2">
                                    <input
                                        type="text"
                                        name="MedicationName"
                                        required
                                        value={dose.MedicationName}
                                        onChange={(e) => handleInputChange(e, index, 'MedicationName')}
                                        placeholder=" eg- Paracetamol "
                                        className="w-full rounded h-12 bg-zinc-700 p-2 text-white font-semibold text-wrap"
                                    />
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <input
                                        type="text"
                                        name="Dosage"
                                        value={dose.Dosage}
                                        onChange={(e) => handleInputChange(e, index, 'Dosage')}
                                        placeholder="eg- 500mg"
                                        className="w-full rounded h-12 bg-zinc-700 p-2 text-white font-semibold text-wrap"
                                    />
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <input
                                        type="text"
                                        name="Frequency"
                                        value={dose.Frequency}
                                        onChange={(e) => handleInputChange(e, index, 'Frequency')}
                                        placeholder=" eg-Twice daily"
                                        className="w-full rounded h-12 bg-zinc-700 p-2 text-white font-semibold text-wrap"
                                    />
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <input
                                        type="text"
                                        name="Duration"
                                        value={dose.Duration}
                                        onChange={(e) => handleInputChange(e, index, 'Duration')}
                                        placeholder="eg- 7 days"
                                        className="w-full rounded h-12 bg-zinc-700 p-2 text-white font-semibold text-wrap"
                                    />
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <input
                                        type="text"
                                        name="Status"
                                        value={dose.Status}
                                        onChange={(e) => handleInputChange(e, index, 'Status')}
                                        placeholder=" eg- Active or Expired"
                                        className="w-full rounded h-12 bg-zinc-700 p-2 text-white font-semibold text-wrap"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-end'>
                    <button
                        type="button"
                        onClick={handleAddDose}
                        className="btn hover:bg-blue-600 text-xl focus:outline-none focus:bg-blue-600"
                    >
                        <RiAddLine />
                    </button>
                </div>
                <div className='flex w-6/12 flex-col'>
                    <div className="border border-gray-400 rounded-lg p-4 mb-4">
                        <h2 className="text-md font-semibold mb-2">Instructions:</h2>
                        <textarea
                            name="Instructions"
                            value={prescriptionData[0].Instructions}
                            onChange={(e) => handleInputChange(e, 0, 'Instructions')}
                            className="w-full rounded border border-gray-400 p-2 bg-gray-500 text-white"
                            rows="1"
                            placeholder="Enter instructions..."
                        ></textarea>
                    </div>
                    <div className="border border-gray-400 rounded-lg p-4 mb-4">
                        <h2 className="text-sm font-semibold mb-2">Prescription Notes:</h2>
                        <textarea
                            name="PrescriptionNotes"

                            value={prescriptionData[0].PrescriptionNotes}
                            onChange={(e) => handleInputChange(e, 0, 'PrescriptionNotes')}
                            className="w-full rounded border border-gray-400 p-2 bg-gray-500 text-white"
                            rows="1"
                            placeholder="Enter prescription notes..."
                        ></textarea>
                    </div>
                </div>

                <div className=' flex gap-11'>
                    <button
                        type="submit"
                        className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-600"
                    >
                        Save Prescription
                    </button>
                    {/* Download PDF link */}
                    <PDFDownloadLink
                        document={<PDFDocument prescriptionData={prescriptionData} instructions={prescriptionData[0].Instructions} prescriptionNotes={prescriptionData[0].PrescriptionNotes} />}
                        fileName="prescription.pdf"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        {({ loading }) => (loading ? 'Generating PDF...' : 'Download Prescrioption PDF')}
                    </PDFDownloadLink>
                </div>
            </form>
        </div>
    );
};

export default MakePrescription;
