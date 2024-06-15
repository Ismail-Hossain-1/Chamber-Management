const pool = require('../db/pool')

// const TodayAppointments = async (req, res) => {
//   const today = new Date().toISOString().slice(0, 10);

//   const sql = `
//     SELECT *
//     FROM tbl_appointments
//     WHERE AppointmentDateTime >= ?
//     AND AppointmentDateTime < ? + INTERVAL 1 DAY;
//   `;

//   pool.query(sql, [today, today], (error, results) => {
//     if (error) throw error;

//     console.log('Today\'s Appointments:', results);

//   });
// }

const AppointmentsToday = async (req, res) => {
  const query = `
  SELECT p.Name, p.Address, p.Age, a.*
  FROM tbl_patients p
  INNER JOIN tbl_appointments AS a ON p.PatientID = a.PatientID
  WHERE p.DoctorID = ? AND CAST(a.AppointmentDateTime AS DATE) = CURDATE()
`;
  const DoctorID = req.user.DoctorId
  const values = [DoctorID];
  try {
    await pool.query(query, values, (err, rows) => {
      if (err) {
        console.error("Error agetting Appointments", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      console.log("appointments ",rows)
      res.status(200).json(rows);
    })
  } catch (error) {
    console.log(error);
  }
};

const PatientsRange = async (req, res) => {
  const DoctorID = req.user.DoctorId;
  try {
    const query = `SELECT 
        COUNT(*) as count,
        CASE
            WHEN age BETWEEN 0 AND 12 THEN 'Infants and Children'
            WHEN age BETWEEN 13 AND 18 THEN 'Adolescents'
            WHEN age BETWEEN 19 AND 30 THEN 'Young Adults'
            WHEN age BETWEEN 31 AND 50 THEN 'Adults'
            WHEN age BETWEEN 51 AND 65 THEN 'Middle-Aged Adults'
            WHEN age BETWEEN 66 AND 80 THEN 'Seniors'
            ELSE 'Elderly'
        END as age_range
    FROM 
        tbl_patients WHERE DoctorID = ?
    GROUP BY 
        CASE
            WHEN age BETWEEN 0 AND 12 THEN 'Infants and Children'
            WHEN age BETWEEN 13 AND 18 THEN 'Adolescents'
            WHEN age BETWEEN 19 AND 30 THEN 'Young Adults'
            WHEN age BETWEEN 31 AND 50 THEN 'Adults'
            WHEN age BETWEEN 51 AND 65 THEN 'Middle-Aged Adults'
            WHEN age BETWEEN 66 AND 80 THEN 'Seniors'
            ELSE 'Elderly'
        END
    ORDER BY 
        age_range;
    `;
    const values = [DoctorID];

    await pool.query(query, values, (err, rows) => {
      if (err) {
        console.error("Error adding patient:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      //const respon= JSON.stringify(rows);
      console.log(rows)
      res.status(200).json(rows);
    })


  } catch (error) {
    console.log(error);
  }
}


module.exports = { AppointmentsToday, PatientsRange }