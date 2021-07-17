const mysql = require('mysql');
const { promisify } = require('util');

const db = mysql.createPool({
    database: 'db_sample',
    user: 'user',
    password: 'password',
    host: 'localhost',
    port: 3306
});

db.getConnection((err, connection)=>{
    if(err){
        console.log(err);
    }else{
        console.log('DATABASE CONNECTED!');
    }
});

db.query = promisify(db.query);

module.exports = db;