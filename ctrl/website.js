let express = require('express');
let router = express.Router();

//路由入口
router.get('/', (req, res) => {
    res.render('../../static/page/index');
});

module.exports = router;