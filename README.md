# nodejs-wx

初始化程序
到工程根目录执行 cnpm install
这个过程会比较长，耐心等待！

全局安装webpack模块
npm install webpack -g

编译前端命令
到工程根目录执行 webpack --progress --profile --colors --config webpack.config.js

编译完成后启动命令
到工程根目录执行 npm start

访问地址
http://localhost:8000/static/page/index.html

=====================================
目录说明
node_modules		依赖模块本地文件
ctrl				路由程序（后期会考虑分离逻辑部分）
static				静态文件
app.js				node程序入口文件
package.json		node配置文件
webpack.config.js	webpack配置
