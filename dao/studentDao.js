// 该文件用于提供对数据库操作的各种方法
const dbutil = require('./dbutil');
// 插入学生数据
function insertStudent(stuNum, name, age, stuClass, pwd, success) {
    const conn = dbutil.createConnect();
    const sql = 'insert into student(stu_num, name, age, class, pwd) values (?,?,?,?,?)';
    conn.connect();
    const param = [stuNum, name, age, stuClass, pwd];
    conn.query(sql, param, function (error, result) {
        if (error === null) {
            // 将查询出来的数据放到回调函数中
            success(result);
        } else {
            throw new Error(error);
        }
    })
    conn.end();
}
// 查询所有学生
function queryAllStudent(success) {
    const conn = dbutil.createConnect();
    const sql = 'select * from student';
    conn.connect();
    conn.query(sql, function (error, result) {
        if (error === null) {
            // 将查询出来的数据放到回调函数中
            success(result);
        } else {
            throw new Error(error);
        }
    })
    conn.end();
}
// 根据学号查询学学生
function queryStudentByStuNum(stuNum, success) {
    const conn = dbutil.createConnect();
    const sql = 'select * from student where stu_num=?';
    conn.connect();
    const param = [stuNum];
    conn.query(sql, param, function (error, result) {
        if (error === null) {
            // 将查询出来的数据放到回调函数中
            success(result);
        } else {
            throw new Error(error);
        }
    })
    conn.end();
}

module.exports = {
    "queryAllStudent": queryAllStudent,
    "insertStudent": insertStudent,
    "queryStudentByStuNum": queryStudentByStuNum
}