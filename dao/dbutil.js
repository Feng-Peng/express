// 该文件返回一个函数，用于创建连接对象
const mysql = require('mysql');

function createConnect() {
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '4008238823',
        database: 'school'
    })
    return connection;
}

module.exports.createConnect = createConnect;