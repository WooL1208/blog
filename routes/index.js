var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const { token } = req.signedCookies;
  const admin = req.isAdmin;
  console.log({'isAdmin': req.isAdmin});
  console.log(admin);
  res.render('index', { title: 'Blog', token, admin});
  
});

module.exports = router;
