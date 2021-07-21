const mysql = require('mysql');

const db = mysql.createPool({
    host: '127.0.0.1',
    port: '3306', 
    user: 'root', // 사용자명
    password: 'qhdks./', // 사용자 비밀번호
    database: 'dcc-web-schema'// database 이름
});

module.exports = db;
