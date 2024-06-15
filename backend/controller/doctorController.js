
const { v4: uuidv4 } = require("uuid");
const pool = require('../db/pool')




const AddPatient = async (req, res) => {
    //   console.log(req.user);
    try {
        const { Name, DateOfBirth, Phone, Email, Address } = req.body.patient;
        const DoctorID= req.user.DoctorId;

        const PatientId = uuidv4();


        const query = `INSERT INTO tbl_patients (PatientId, Name, DateOfBirth, Phone, Email, Address, DoctorID) VALUES (?, ?, ?, ?, ?, ?,?)`;
        const values = [PatientId, Name, DateOfBirth, Phone, Email, Address, DoctorID];


        await pool.query(query, values, (error, results, fields) => {
            if (error) {
                console.error("Error adding patient:", error);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            res.status(200).json({ message: "Patient added successfully", PatientId });
        });
    } catch (error) {
        console.error("Error in AddPatient:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const AddAppoinment = async (req, res) => {
    const { PatientID, AppointmentDateTime, Status, Notes } = req.body;
    const AppointmentID = uuidv4();
    const DoctorID = req.user.DoctorId;
    console.log(req.body);

    try {
        const query = 'INSERT INTO tbl_appointments (AppointmentID,	PatientID, DoctorID, AppointmentDateTime, Status, Notes) VALUES (?,?,?,?,?,?)';
        values = [AppointmentID, PatientID, DoctorID, AppointmentDateTime, Status, Notes]
        await pool.query(query, values, (err, rows) => {
            if (err) {
                console.error("Error adding patient:", err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            res.status(200).json({ message: "Patient added successfully" });
        })

    } catch (error) {
        console.log(error);
    }
}

const AllAppoinments = async (req, res) => {
    const DoctorID = req.user.DoctorId;
    console.log(req.body);
    try {
        const query = 'SELECT p.Name, a.* FROM tbl_patients p INNER JOIN tbl_appointments a ON p.PatientID = a.PatientID WHERE p.DoctorID=?';
        const values = [DoctorID];
        await pool.query(query, values, (err, rows) => {
            if (err) {
                console.error("Error adding patient:", err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            console.log(rows)
            res.status(200).json(rows);
        })
    } catch (error) {
        console.log(error);
    
    }
}

const MakePrescription = async (req, res) => {
    const { PatientID, MedicationName, Dosage, Frequency, Duration, Status, Instructions, PrescriptionNotes } = req.body;
    const DateIssued=''
    const DoctorID = req.user.DoctorId;
    const PrescriptionID= uuidv4();

    const sql = 'INSERT INTO tbl_prescription (PrescriptionID, PatientID, DoctorID, DateIssued, MedicationName, Dosage, Frequency, Duration, Status, Instructions, PrescriptionNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [PrescriptionID ,PatientID, DoctorID, DateIssued, MedicationName, Dosage, Frequency, Duration, Status, Instructions, PrescriptionNotes];

    await pool.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }
        console.log('Prescription saved successfully');
        res.status(201).send('Prescription saved successfully');
    });
}

const AllPatients = async (req, res) => {
    const DoctorID = req.user.DoctorId;
    console.log(DoctorID);

    try {
        const query = 'SELECT * FROM tbl_patients WHERE DoctorID= ? ORDER BY registration_date DESC;';
        const values = [DoctorID];
        await pool.query(query, values, (err, rows) => {
            if (err) {
                console.error("Error adding patient:", err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            //console.log(rows)
            res.status(200).json(rows);
        })
    } catch (error) {
        console.log(error);
    }

}

module.exports = { AddPatient, AddAppoinment, AllAppoinments, MakePrescription, AllPatients };