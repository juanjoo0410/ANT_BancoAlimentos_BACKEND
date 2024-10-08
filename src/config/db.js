require('dotenv').config();
const mysql = require('mysql2');

var connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if(!err){
        console.log("Database Connected");
    } else {
        console.log("Database don't connected", err);
    }
});

module.exports = connection;