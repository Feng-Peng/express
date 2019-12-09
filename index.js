const express = require('express');
const globalConfig = require('./conf');
const app = new express();
const loader = require('./loader');
app.use(express.static(globalConfig.page_path));

app.get('/api/*', function (request, response, next) {
    response.redirect("/login.html");
    // next();
})

loader.init(app);
app.listen(globalConfig["port"]);