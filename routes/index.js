var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const { token } = req.signedCookies;
  console.log(req.signedCookies);
  res.render('index', { title: 'Express', token});
});

module.exports = router;
