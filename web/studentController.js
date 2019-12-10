// 该文件用于创建接口供外界访问（使用的函数来自于dao文件夹）
const requestDao = require('../dao/studentDao');
const path = new Map();
const url = require("url");
const fs = require("fs");

function queryAllStudent(request, response) {
    requestDao.queryAllStudent(function (result) {
        response.writeHead(200);
        response.write(JSON.stringify(result));
        response.end();
    })
}

function insertStudent(request, response) {
    const param = url.parse(request.url, true).query;
    requestDao.insertStudent(param.stuNum, param.name, param.age, param.stuClass, param.pwd, function () {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.write('添加成功');
        response.end();
    });
}

function queryStudentByStuNum(request, response) {
    const param = url.parse(request.url, true).query;
    requestDao.queryStudentByStuNum(param.stuNum, function (result) {
        if (result && result.length > 0 && result[0].pwd == param.pwd) {
            // 写cookie
            response.cookie('id', param.id);
            // 跳转页面
            response.redirect('/api/queryAllStudent');
        } else {
            response.redirect('/loginError.html');
        }
    })
}

function getPic(request, response) {
    const param = url.parse(request.url, true).query;
    try {
        const data = fs.readFileSync(param.path);
        response.writeHead(200);
        response.write(data);
        response.end();
    } catch (e) {
        response.writeHead(404);
        response.end();
    }
}

// 创建的接口
path.set('/api/queryAllStudent', queryAllStudent);
path.set('/api/insertStudent', insertStudent);
path.set('/login', queryStudentByStuNum);
path.set('/getPic', getPic);

// path中一个接口对应一个处理函数（使用的函数来自于dao文件夹）
module.exports.path = path;