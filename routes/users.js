var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  const { user } = req.signedCookies;
  const { error } = req.query;

  res.render('users/login', { title: '會員中心', user, error });
});

module.exports = router;
