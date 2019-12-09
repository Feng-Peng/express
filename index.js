const express = require('express');
const globalConfig = require('./conf');
const app = new express();
const loader = require('./loader');
app.use(express.static(globalConfig.page_path));

loader.init(app);

app.listen(globalConfig["port"]);