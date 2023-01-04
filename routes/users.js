var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  const { user } = req.signedCookies;
  const { error } = req.query;

  res.render('users/login', { title: '會員中心', user, error });
});

router.get('/register', function (req, res, next) {
  res.render('users/register', { title: '註冊' })
});

module.exports = router;
