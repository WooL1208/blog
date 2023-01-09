var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Blog', isLoggedIn: req.isAdmin, isAdmin: req.isAdmin });
});

// 警告頁面
router.get('/warning', function (req, res, next) {
  res.render('warning');
});

module.exports = router;
