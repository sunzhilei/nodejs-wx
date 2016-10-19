let http = require('http');
let querystring = require('querystring');

exports.processMessage = (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/xml'});
    let data = req.body.xml;
    let errorMessage = 
    '<xml>' +
        '<ToUserName><![CDATA[' + data.FromUserName + ']]></ToUserName>' +
        '<FromUserName><![CDATA[' + data.ToUserName + ']]></FromUserName>' +
        '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
        '<MsgType><![CDATA[text]]></MsgType>' +
        '<Content><![CDATA[抱歉，暂时无法为您提供服务！]]></Content>' +
    '</xml>';
    console.log(data.MsgType);
    switch(data.MsgType){
        case 'text':
        this.replyText(data).then(replyData => {
            res.end(
            '<xml>' +
                '<ToUserName><![CDATA[' + data.FromUserName + ']]></ToUserName>' +
                '<FromUserName><![CDATA[' + data.ToUserName + ']]></FromUserName>' +
                '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
                '<MsgType><![CDATA[text]]></MsgType>' +
                '<Content><![CDATA['+replyData.text+']]></Content>' +
            '</xml>'
            );
        }, e => {
            res.end(errorMessage);
        });
        break;
        case 'image':
        res.end(
        '<xml>' +
            '<ToUserName><![CDATA[' + data.FromUserName + ']]></ToUserName>' +
            '<FromUserName><![CDATA[' + data.ToUserName + ']]></FromUserName>' +
            '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
            '<MsgType><![CDATA[image]]></MsgType>' +
            '<Image>' +
                '<MediaId><![CDATA[' + data.MediaId + ']]></MediaId>' +
            '</Image>' +
        '</xml>'
        );
        break;
        case 'voice':
        res.end(
        '<xml>' +
            '<ToUserName><![CDATA[' + data.FromUserName + ']]></ToUserName>' +
            '<FromUserName><![CDATA[' + data.ToUserName + ']]></FromUserName>' +
            '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
            '<MsgType><![CDATA[voice]]></MsgType>' +
            '<Voice>' +
                '<MediaId><![CDATA[' + data.MediaId + ']]></MediaId>' +
            '</Voice>' +
        '</xml>'
        );
        break;
        case 'video':
        res.end(
        '<xml>' +
            '<ToUserName><![CDATA[' + data.FromUserName + ']]></ToUserName>' +
            '<FromUserName><![CDATA[' + data.ToUserName + ']]></FromUserName>' +
            '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
            '<MsgType><![CDATA[video]]></MsgType>' +
            '<Video>' +
                '<MediaId><![CDATA[' + data.MediaId + ']]></MediaId>' +
                '<Title><![CDATA[标题]]></Title>' +
                '<Description><![CDATA[描述]]></Description>' +
            '</Video>' +
        '</xml>'
        );
        break;
        case 'shortvideo':
        res.end(
        '<xml>' +
            '<ToUserName><![CDATA[' + data.FromUserName + ']]></ToUserName>' +
            '<FromUserName><![CDATA[' + data.ToUserName + ']]></FromUserName>' +
            '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
            '<MsgType><![CDATA[video]]></MsgType>' +
            '<Video>' +
                '<MediaId><![CDATA[' + data.MediaId + ']]></MediaId>' +
                '<Title><![CDATA[标题]]></Title>' +
                '<Description><![CDATA[描述]]></Description>' +
            '</Video>' +
        '</xml>'
        );
        break;
        case 'music':
        res.end(
        '<xml>' +
            '<ToUserName><![CDATA[' + data.FromUserName + ']]></ToUserName>' +
            '<FromUserName><![CDATA[' + data.ToUserName + ']]></FromUserName>' +
            '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
            '<MsgType><![CDATA[music]]></MsgType>' +
            '<Music>' +
                '<Title><![CDATA[标题]]></Title>' +
                '<Description><![CDATA[描述]]></Description>' +
                '<MusicUrl><![CDATA[http://m10.music.126.net/20161013160038/25c94254ca4a00aaef94ef1c42ca236a/ymusic/bbaa/0f7e/e46b/5c53a99e110673a9f08725b23aeeea85.mp3]]></MusicUrl>' +
                '<HQMusicUrl><![CDATA[http://m10.music.126.net/20161013160038/25c94254ca4a00aaef94ef1c42ca236a/ymusic/bbaa/0f7e/e46b/5c53a99e110673a9f08725b23aeeea85.mp3]]></HQMusicUrl>' +
                '<ThumbMediaId><![CDATA[' + data.MediaId + ']]></ThumbMediaId>' +
            '</Music>' +
        '</xml>'
        );
        break;
        case 'news':
        res.end(
        '<xml>' +
            '<ToUserName><![CDATA[' + data.FromUserName + ']]></ToUserName>' +
            '<FromUserName><![CDATA[' + data.ToUserName + ']]></FromUserName>' +
            '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
            '<MsgType><![CDATA[news]]></MsgType>' +
            '<ArticleCount>2</ArticleCount>' +
            '<Articles>' +
                '<item>' +
                    '<Title><![CDATA[标题]]></Title>' +
                    '<Description><![CDATA[描述]]></Description>' +
                    '<PicUrl><![CDATA[picurl]]></PicUrl>' +
                    '<Url><![CDATA[url]]></Url>' +
                '</item>' +
                '<item>' +
                    '<Title><![CDATA[标题]]></Title>' +
                    '<Description><![CDATA[描述]]></Description>' +
                    '<PicUrl><![CDATA[picurl]]></PicUrl>' +
                    '<Url><![CDATA[url]]></Url>' +
                '</item>' +
            '</Articles>' +
        '</xml>'
        );
        break;
    }
}



exports.replyText = (data) => {
    return new Promise((resolve, reject) => {
        let postData = querystring.stringify({
            'key' : 'e41c15b912fb43868bdaf36c8c9cf53f',
            'info' : data.Content,
            'userid' : data.FromUserName
        });
        let options = {
            host: 'www.tuling123.com',
            port: 80,
            path: '/openapi/api',
            method: 'POST',
            rejectUnauthorized: false,
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
            }
        };
        let req = http.request(options, res => {
            if (res.statusCode === 200) {
                res.setEncoding('utf8');
                res.on('data', buffer => {
                    resolve(JSON.parse(buffer.toString()));
                })
            } else {
                req.on('error', e => {
                    reject(new Error(e));
                });
            }
        });
        req.write(postData);
        req.end();
    });
}