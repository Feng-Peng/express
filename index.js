const express = require('express');
const globalConfig = require('./conf');
const app = new express();
const loader = require('./loader');
const cookie = require('cookie-parser');
app.use(express.static(globalConfig.page_path));
app.use(cookie());

app.get('/api/*', function (request, response, next) {
    if (request.cookies.id) {
        next();
    } else {
        response.redirect("/login.html");
    }
})

loader.init(app);
app.listen(globalConfig["port"]);