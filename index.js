const express = require('express');
const globalConfig = require('./conf');
const app = new express();
const loader = require('./loader');
const cookie = require('cookie-parser');
app.use(express.static(globalConfig.page_path));
app.use(cookie());
const multer = require('multer');
const userMsg = require('./dao/userMsgDao');

app.get('/api/*', function (request, response, next) {
    if (request.cookies.id) {
        next();
    } else {
        response.redirect("/login.html");
    }
})
// 上传的文件存放在file文件夹下
const uploadSingle = multer({ dest: './file/' });
// 解析处理上传的myFile文件，与 form.append('myFile', file); 中的myFile对应
// 回调函数中用户获取上传的内容的信息
app.post('/upload', uploadSingle.single('myFile'), function (request, response) {
    console.log(request.file.originalname);
    console.log(request.file.size);
    console.log(request.file.path);
    console.log(request.body.name);

    userMsg.insertUserMsg(request.body.name, request.file.path, request.file.originalname, request.file.size, function (result) {
        const resp = {
            path: request.file.path
        }
        response.writeHead(200);
        response.write(JSON.stringify(resp));
        response.end();
    })
})

loader.init(app);
app.listen(globalConfig["port"]);