var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();


/* 
  登入 
  post /auth 
*/
router.post('/', async function (req, res, next) {
  const { username, password } = req.body;

  const [rows, fields] = await mysql.execute('SELECT * FROM `user` WHERE username = ?', [username]);

  if (rows.length != 1) {
    return res.json({
      'status': false,
      'message': '帳號或密碼錯誤',
    })
  }

  const user = rows[0];

  if (!await argon2.verify(user.password, password)) {
    return res.json({
      'status': false,
      'message': '帳號或密碼錯誤',
    })
  }

  res.cookie('user', user.name, { signed: true });
  res.cookie('userId', user.id, {signed: true});

  return res.json({
    'status': true,
    'message': '成功',
  })
});

/* 
  登出 
  delete /auth 
*/
router.get('/logout', function (req, res, next) {
  res.clearCookie('user');
  return res.json({
    'status': true,
    'message': '成功',
  })
});

module.exports = router;
