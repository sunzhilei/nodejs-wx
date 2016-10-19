let https = require('https');
let fs = require('fs');
let schedule = require('node-schedule');


exports.getAccessTokenForFile = () => {
    console.log(JSON.parse(fs.readFileSync('./ctrl/wx/access_token.json')).access_token);
}

exports.updateAccessTokenScheduleJob = () => {



    this.getAccessTokenForHttp().then(access_token => {
        fs.writeFile('./ctrl/wx/access_token.json', JSON.stringify(access_token), (err) => {
            if (err) throw err;
            console.log('已更新Access Token！');
        });
    }, e => {
        console.error("更新Access Token失败:" + e);
    });


    let rule = new schedule.RecurrenceRule();
    rule.minute = 59;
    schedule.scheduleJob(rule, () => {
        this.getAccessTokenForHttp().then(access_token => {
            fs.writeFile('./ctrl/wx/access_token.json', JSON.stringify(access_token), (err) => {
                if (err) throw err;
                console.log('已更新Access Token！');
            });
        }, e => {
            console.error("更新Access Token失败:" + e);
        });
    });
}

exports.getAccessTokenForHttp = () => {
    return new Promise((resolve, reject) => {
        let options = {
            hostname: 'api.weixin.qq.com',
            port: 443,
            path: '/cgi-bin/token?grant_type=client_credential&appid=wxb05bb562f6415aa6&secret=48e84b1eab2a7746623d896fd7b41e20',
            method: 'GET'
        };
        let req = https.request(options, res => {
            if (res.statusCode === 200) {
                res.on('data', buffer => {
                    resolve(JSON.parse(buffer.toString()));
                })
            } else {
                req.on('error', e => {
                    reject(new Error(e));
                });
            }
        });
        req.end();
    });
}