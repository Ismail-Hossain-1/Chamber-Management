
const { v4: uuidv4 } = require("uuid");
const pool = require('../db/pool')




const AddPatient = async (req, res) => {
    //   console.log(req.user);
    try {
        const { Name, Age, DateOfBirth, Phone, Email, Address } = req.body.patient;
        const DoctorID = req.user.DoctorId;

        const PatientId = uuidv4().replace(/-/g, '').substring(0, 30);

        console.log(PatientId)
        const query = `INSERT INTO tbl_patients (PatientId, Name, Age, DateOfBirth, Phone, Email, Address, DoctorID) VALUES (?, ?, ?, ?, ?, ?,?, ?)`;
        const values = [PatientId, Name, Age, DateOfBirth, Phone, Email, Address, DoctorID];


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
    const AppointmentID = uuidv4().replace(/-/g, '').substring(0, 30);
    const DoctorID = req.user.DoctorId;
    //console.log(req.body);

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
    // console.log(req.body);
    try {
        const query = 'SELECT p.Name, a.* FROM tbl_patients p INNER JOIN tbl_appointments a ON p.PatientID = a.PatientID WHERE p.DoctorID=? ORDER BY a.AppointmentDateTime DESC';
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

const MakePrescription = async (req, res) => {
    //console.log(req.body); // Check backend request body

    const { PatientID, PrescriptionData, Instructions, PrescriptionNotes } = req.body;
    const DateIssued = new Date().toISOString().slice(0, 19).replace('T', ' '); // Current date in YYYY-MM-DD format

    const DoctorID = req.user.DoctorId;
    const PrescriptionID = uuidv4().replace(/-/g, '').substring(0, 30); // Generate a unique PrescriptionID

    if (!Array.isArray(PrescriptionData) || PrescriptionData.length === 0) {
        return res.status(400).send({ message: 'Invalid PrescriptionData format' });
    }

    try {
        const prescriptionValues = PrescriptionData.map(dose => [
            PrescriptionID,
            PatientID,
            DoctorID,
            DateIssued,
            dose.MedicationName,
            dose.Dosage,
            dose.Frequency,
            dose.Duration,
            dose.Status,
            Instructions,
            PrescriptionNotes
        ]);

        const sql = 'INSERT INTO tbl_prescription (PrescriptionID, PatientID, DoctorID, DateIssued, MedicationName, Dosage, Frequency, Duration, Status, Instructions, PrescriptionNotes) VALUES ?';

        await pool.query(sql, [prescriptionValues], (err, result) => {
            if (err) {
                console.error('Error saving prescription:', err);
                return res.status(500).send({ message: 'Failed to save prescription' });
            }
            console.log('Prescription saved successfully');
            res.status(201).send({ message: 'Prescription saved successfully' });
        });
    } catch (error) {
        console.error('Error making prescription:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

const AllPrescriptions = async (req, res) => {
    try {
        const DoctorID = req.user.DoctorId;
        console.log('Doctor: ', DoctorID)
        const query = `SELECT p.Name, p.Address, p.Email, pres.* 
            FROM tbl_patients p INNER JOIN 
            tbl_prescription pres ON p.PatientID = pres.PatientID WHERE pres.DoctorID=? ORDER BY pres.DateIssued DESC`

        await pool.query(query, [DoctorID], (err, rows) => {
            if (err) {
                console.error("Error getting all prescriptions:", err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            //console.log(rows)
            res.status(200).json(rows);
        })
    } catch (error) {
        console.error(error);
    }
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

const UpdateAppointment = async (req, res) => {
    const DoctorID = req.user.DoctorId;
    const query = `UPDATE tbl_appointments SET Notes = ?, Status = ? WHERE AppointmentID = ?`;

    const { Notes, Status, AppointmentID } = req.body;
    console.log(req.body);
    try {
        await pool.query(query, [Notes, Status, AppointmentID], (err, results, fields) => {
            if (err) {
                console.error('Error updating appointments:', err);
                return res.status(500).json({ error: 'Failed to update appointment' }); // Send error response to client
            }

            // console.log(`Updated ${results.affectedRows} rows`);
            return res.status(200).json({ message: 'Appointment updated successfully' });
        });
    } catch (error) {

    }
}

const AppTodo = async (req, res) => {
    const query = `
    SELECT p.Name, p.Address, p.Age, a.*
    FROM tbl_patients p
    INNER JOIN tbl_appointments AS a ON p.PatientID = a.PatientID
    WHERE p.DoctorID = ? AND CAST(a.AppointmentDateTime AS DATE) = CURDATE()
  `;
    const DoctorID = req.user.DoctorId
    const values = [DoctorID];
    // console.log(pool.config)
    try {
        await pool.query(query, values, (err, rows) => {
            if (err) {
                console.error("Error agetting Appointments", err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            //console.log("appointments ",rows)
            console.log(DoctorID);
            res.status(200).json(rows);
        })
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    AddPatient, AddAppoinment, AllAppoinments,
    MakePrescription, AllPrescriptions, AllPatients, UpdateAppointment
};