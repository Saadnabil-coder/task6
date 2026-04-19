const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'saad',
    password: '12345678',
    multipleStatements: true
});

module.exports = connection;