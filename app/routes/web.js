var router = require('express').Router();
var path = require('path');

router.get('/', function (req, res) {
    res.sendFile('views/index.html', {
        root: path.join(__dirname, '../'),
        headers: {
            'x-email' : ''
        }
    });
});

module.exports = router;
