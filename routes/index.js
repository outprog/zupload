var express = require('express');
var router = express.Router();
var path = require('path');

var moment = require('moment');
var fs = require('fs');

var formidable = require('formidable');

// 上传目录
var dir = path.join(__dirname, '../upload_dir');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Zupload' });
});

module.exports = router;
