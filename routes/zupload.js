var express = require('express');
var router = express.Router();
var path = require('path');

var moment = require('moment');
var fs = require('fs');

var formidable = require('formidable');

// 上传目录
var dir = path.join(__dirname, '../upload_dir');

//
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Zupload' });
});

// 文件上传
router.post('/up', function(req, res, next) {
  // 上传文件夹
  var uploadDir = path.join(dir, moment().format('YYYYMMDD'));

  // 查看是否存在上传文件夹
  if(!fs.existsSync(uploadDir)) {
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
    if(err) {
      console.log(err);
      return res.send({res: 'failed'});
    }
    var reg = new RegExp(dir, 'g');
    var output = JSON.stringify(files).replace(reg, '');
    res.send(output);
  });
});


// 文件删除
router.get('/del', function(req, res, next) {
  if(!req.query.path) return res.send({res: 'no path'});
  var filePath = req.query.path;
  delFile = path.join(dir, filePath);
  fs.unlink(delFile, function(err) {
    if(err) {
      console.log(err);
      return res.send({res: 'not found'});
    }
    res.send({res: 'ok'});
  });
});


// 文件下载
router.get('/down', function(req, res, next) {
  if(!req.query.path) return res.send({res: 'no path'});
  var filePath = path.join(dir, req.query.path);
  var fileName = req.query.name;
  res.download(filePath, fileName, function(err) {
    if(err) {
      console.log(err);
      return res.send({res: 'not found'});
    }
  });
});


module.exports = router;
