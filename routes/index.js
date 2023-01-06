var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const { token } = req.signedCookies;
  console.log({'isAdmin': req.isAdmin});
  res.render('index', { title: 'Blog', token});
});

module.exports = router;
