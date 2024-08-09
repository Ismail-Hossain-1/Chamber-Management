const mysql = require('mysql');
const config = require('../db/config'); // Assuming config.js holds your database connection details

const pool = mysql.createPool(config);

pool.getConnection((err, connection) => {
    if (err) {
        console.log({ error: err.message });
    } else {
        console.log("Connected to mysql");
        connection.release();
    }
});

module.exports = pool;
