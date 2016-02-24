var express = require('express');
var router = express.Router();
var path = require('path');

var moment = require('moment');
var fs = require('fs');

var formidable = require('formidable');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Zupload' });
});


// 文件上传
router.post('/up', function(req, res, next) {
  // 上传文件夹
  var uploadDir = path.join(__dirname, '../upload_dir', moment().format('YYYYMMDD'));

  // 查看是否存在上传文件夹
  if(!fs.exists(uploadDir)) {
    fs.mkdir(uploadDir, function(error) {
      console.log(error);
    });
  }

  // parse a file upload
  var form = new formidable.IncomingForm();
  form.uploadDir = uploadDir;
  form.keepExtensions = true;
  form.multiples = true;

  form.parse(req, function(err, fields, files) {
    res.send(JSON.stringify(files));
  });
});

module.exports = router;
