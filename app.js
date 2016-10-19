var express = require('express');
var app = express();

// 安装html视图引擎
let engines = require('consolidate');
app.set('views', './static/page');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
// 前端资源静态化
var options = {
	etag: true,
	extensions: ['htm', 'html', 'css', 'png', 'jpg', 'gif', 'js'],
	lastModified: true,
	maxAge: 100 * 24 * 60 * 60,
	redirect: false,
	setHeaders: function (res, path, stat) {
		res.setHeader('Expires', new Date(new Date().valueOf() + 100 * 24 * 60 * 60 * 1000).toUTCString());
		res.setHeader('cache-control', 'max-age=' + 100 * 24 * 60 * 60);
	}
};
app.use('/static', express.static('./static', options));
app.use('/node_modules', express.static('./node_modules', options));

// 微信接口
let ctrl_wx_valid = require('./ctrl/wx/valid');
app.use('/wx', ctrl_wx_valid);

// 启动定时任务，每小时获取一次access_token并保存
let accessTokenJob = require('./ctrl/wx/access_token');
accessTokenJob.updateAccessTokenScheduleJob();



// 官网入口
let ctrl_website = require('./ctrl/website');
app.use('/', ctrl_website);

// 监听服务
app.listen(process.env.PORT || 5050,function() {
	console.log('Server ' + process.env.PORT + ' 或 5050 已启动！');
});