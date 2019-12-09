// 该文件用于将web文件夹中所有的数据接口汇总到一起返回
const fs = require("fs");
const gloablConfig = require("./conf");
const pathMap = new Map();
const controllerSet = [];

function init(app) {
    const files = fs.readdirSync(gloablConfig['web_path']);
    for (let i = 0; i < files.length; i++) {
        const temp = require('./' + gloablConfig['web_path'] + '/' + files[i]);
        if (temp.path) {
            for (let [key, value] of temp.path) {
                if (pathMap.get(key) == null) {
                    pathMap.set(key, value);
                    // 第一个参数是接口名称，第二个参数是调用的函数
                    app.get(key, value);
                } else {
                    throw new Error('配置文件异常,' + key)
                }
                controllerSet.push(temp);
            }
        }
    }
}

module.exports.init = init;
