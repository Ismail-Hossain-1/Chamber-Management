
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require("uuid");
const config = require('../db/config');
const pool = require('../db/pool')



const Register = async (req, res) => {
    console.log(req.body);
    const { name, registration, speciality, qualifications, phone,
        email, password, address, clinicAddress, availability, fees } = req.body;
    //console.log(req.body);
    const DoctorId = uuidv4().replace(/-/g, '').substring(0, 30)
    const hashedPass = await bcrypt.hash(password, 8);

    try {
        // Check if registration already exists
        await pool.query('SELECT Registration FROM tbl_doctors WHERE Registration = ?', [registration],
            (err, result) => {
                if (err) throw err

                // console.log(existingDoctor);
                else if (result.length === 0) {
                    // Registration does not exist, insert new record
                    pool.query(`INSERT INTO tbl_doctors (DoctorId, Registration, Name, Speciality, Qualifications, Phone, Email, Password, Address, ClinicAddress, Availability, Fees) VALUES (?,?,?,?,?,?,?,?,?,?, ?, ?)`,
                        [DoctorId, registration, name, speciality, qualifications, phone, email, hashedPass, address, clinicAddress, availability, fees],
                        (err, result1) => {
                            if (err) {
                                console.error(err);
                                res.status(500).json({ error: 'Internal Server Error' });
                                return;
                            }
                            console.log("created :", result1);
                            res.status(201).json({ message: 'Account Created' });
                        });
                } else {
                    // Registration already exists
                    res.status(400).json({ error: 'Registration already exists' });
                }
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Invalid Credentials" });
        return;
    }

    try {

        await pool.query(`SELECT * FROM tbl_doctors WHERE Email= ?`, [email], (err, rows) => {
            console.log(rows[0].Name)
            if (err) throw err;
            if (rows.length === 0) return res.json({ error: "Email not found" })
            if (rows.length > 0) {
                if (!rows[0].EmailConfirmed) return res.json({ error: "Email not Confirmed!" })
                const { Password, EmailConfirmed, AppTodo, PatTodo, ...user } = rows[0];
                console.log(user)

                const token = jwt.sign(user, process.env.JWT_TOKEN);

                res.setHeader('Authorization', `${token}`)
                res.json({
                    user: user,
                    token: token
                });


            }
        });

    } catch (error) {
        console.log(error)
    }

}
const Logout = (req, res) => {
    res.json({
        user: null,
        token: null
    })
}

const test = (req, res) => {
    const token = req.headers['Authorization']
    console.log(token);
}


module.exports = { Register, Login, Logout };