var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res, next) {
  const { token } = req.signedCookies;
  const admin = req.isAdmin;
  // console.log({'isAdmin': req.isAdmin});
  res.render('index', { title: 'Blog', token, admin});
  
});

// 警告頁面
router.get('/warning', function(req, res, next) {
  res.render('warning');
  
});

module.exports = router;
