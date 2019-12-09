// 该文件用于创建接口供外界访问
const requestDao = require('../dao/studentDao');
const path = new Map();

function queryAllStudent(request, response) {
    requestDao.queryAllStudent(function (result) {
        response.writeHead(200);
        response.write(JSON.stringify(result));
        response.end();
    })
}
// 创建的接口
path.set('/queryAllStudent', queryAllStudent);

// path中一个接口对应一个处理函数（使用的函数来自于dao文件夹）
module.exports.path = path;