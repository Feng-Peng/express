const dbutil = require('./dbutil');

function insertUserMsg(UserName, picPath, originName, picSize, success) {
    const conn = dbutil.createConnect();
    const sql = 'insert into usermsg(name, pic_path, origin_name, pic_size) values (?,?,?,?)';
    conn.connect();
    const param = [UserName, picPath, originName, picSize];
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
    "insertUserMsg": insertUserMsg
}