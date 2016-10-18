var express = require('express');
var config = require('../../config')();

var router = express.Router();

router.route('/')
    .get(function(req, res){
        res.json({ message: 'Im alive!' });
    });

router.route('/config')
    .get(function(req, res){
        res.json(config);
    });

module.exports = router;