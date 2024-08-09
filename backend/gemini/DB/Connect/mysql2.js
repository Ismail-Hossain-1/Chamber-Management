const mysql2= require('mysql2/promise');

const connection = async () => {
    try {
        const conn = await mysql2.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        });

        console.log('MySQL2 connected');
        return conn; // Return the connection object if needed
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
        throw error; // Rethrow the error or handle it appropriately
    }
};

module.exports= {connection}