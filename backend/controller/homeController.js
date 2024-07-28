const { json } = require('body-parser');
const pool = require('../db/pool')

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
      //console.log("appointments ",rows)
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
      res.status(200).json(rows);
    })


  } catch (error) {
    console.log(error);
  }
}



const AppTodo = async (req, res) => {
  const DoctorID = req.user.DoctorId;
  const todo = req.body.apptodo;
  try {
    const query = 'SELECT * FROM tbl_doctors WHERE 1';
    //await pool.query("UPDATE tbl_doctors SET AppTodo = what are you doing WHERE DoctorId=91ddea0408544a7f8561b6415a024a");
    await pool.query("UPDATE tbl_doctors SET AppTodo = ? WHERE DoctorId = ?", [todo, DoctorID], (err, rows) => {
      if (err) {
        console.error("Error adding patient:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      console.log(JSON.stringify(rows))
      res.status(200).json({
        msg: "Update Successfull"
      });
    })

  } catch (error) {
    console.error("Error updating AppTodo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const PatTodo = (req, res) => {
  const DoctorID = req.user.DoctorId;
  const todo = req.body.pattodo;
  // console.log("body :", req.body.pattodo)
  try {
    const query = 'UPDATE tbl_doctors SET PatTodo = ? WHERE DoctorId=?'

    pool.query(query, [todo, DoctorID], (err, rows) => {
      if (err) {
        console.error("Error adding patient:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      console.log(rows)
      res.status(200).json({
        msg: "Updated successfully"
      });
    })
  } catch (error) {
    console.log(error)
  }
}
const GetAppTodo = (req, res) => {

  const DoctorId = req.user.DoctorId;
  const selectQuery = `SELECT AppTodo FROM tbl_doctors WHERE DoctorId = ?`;
  pool.query(selectQuery, [DoctorId], (err, rows) => {
    if (err) {
      console.error('Error fetching todo:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    //console.log(rows[0].AppTodo)
    res.status(200).json({ apptodo: rows[0].AppTodo });
  });
};

const GetAPatTodo = (req, res) => {

  const DoctorId = req.user.DoctorId;
  const selectQuery = `SELECT PatTodo FROM tbl_doctors WHERE DoctorId = ?`;
  pool.query(selectQuery, [DoctorId], (err, rows) => {
    if (err) {
      console.error('Error fetching todo:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    //console.log(rows[0].PatTodo)
    res.status(200).json({ pattodo: rows[0].PatTodo });
  });
};

module.exports = { AppointmentsToday, PatientsRange, AppTodo, PatTodo, GetAppTodo, GetAPatTodo }