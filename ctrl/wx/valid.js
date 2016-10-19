let express = require('express');
let router = express.Router();

let url = require('url');
let crypto = require('crypto');

let bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
let message = require('./message');

//路由入口
router.get('/valid', (req, res) => {
	this.validSession(req, res).then(echostr => {
		res.end(echostr);
	}, e => {
		res.end("false");
	});
});


router.use(bodyParser.xml({
		limit: '1MB',//拒绝载荷大于1 MB
		xmlParseOptions: {
			normalize: true,//修剪空白文本节点
			normalizeTags: false,//标签转换成小写
			explicitArray: false//如果>1,仅在数组中放置节点
		}
	})
);
router.post('/valid',(req,res) => {
	this.validSession(req, res).then(echostr => {
		message.processMessage(req, res);
	});
});





exports.validSession = (req, res) => {
	return new Promise((resolve, reject) => {
		let query = url.parse(req.url, true).query;

		let signature = query.signature;
		let echostr = query.echostr;
		let timestamp = query['timestamp'];
		let nonce = query.nonce;

		let oriArray = new Array();
		oriArray[0] = nonce;
		oriArray[1] = timestamp;
		oriArray[2] = "hahaha_20160926";
		oriArray.sort();
		let original = oriArray.join('');
		let scyptoString = sha1(original);

		if (signature == scyptoString) {
			resolve(echostr);
		} else {
			reject("false");
		}
	});
}

//sha1加密方法
function sha1(str) {
	let md5sum = crypto.createHash("sha1");
	md5sum.update(str);
	str = md5sum.digest("hex");
	return str;
}

module.exports = router;