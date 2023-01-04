var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const { user } = req.signedCookies;
  res.render('index', { title: 'Express', user});
});

module.exports = router;
