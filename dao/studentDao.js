// 该文件用于查询数据库中所有的学生数据
const dbutil = require('./dbutil');

function queryAllStudent(success) {
    const conn = dbutil.createConnect();
    const sql = 'select * from student';
    conn.connect();
    conn.query(sql, function (error, result) {
        if (error === null) {
            console.log(result);
            // 将查询出来的数据放到回调函数中
            success(result);
        } else {
            throw new Error(error);
        }
    })
    conn.end();
}

module.exports = {
    "queryAllStudent": queryAllStudent
}