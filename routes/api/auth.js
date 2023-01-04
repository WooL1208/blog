var express = require('express');
var { promisePool: mysql } = require('../../lib/mysql');
var router = express.Router();
const jwt = require('jsonwebtoken');
var argon2 = require('argon2');

function generateAccessToken(account) {
  return jwt.sign(account, process.env.TOKEN_SECRET, { expiresIn: '30d' });
}

/*
  登入
  post /api/auth
*/

router.post('/', async function (req, res, next) {
  const { username: account, password } = req.body;

  const [rows, fields] = await mysql.execute('SELECT * FROM `user` WHERE account = ?', [account]);

  // 判斷有沒有這個帳號
  if (rows.length != 1) {
    return res.json({
      'status': false,
      'token': null,
      'message': '帳號或密碼錯誤',
    })
  }

  // 判斷密碼是否正確
  const user = rows[0];
  if (!await argon2.verify(user.password, password)) {
    return res.json({
      'status': false,
      'token': null,
      'message': '帳號或密碼錯誤',
    })
  }

  return res.json({
    'status': true,
    'token': generateAccessToken(user.account),
    'message': '成功',
  })
});

/*
  登出
  delete /api/auth
*/
// router.get('/logout', function (req, res, next) {
//   res.clearCookie('user');
//   return res.json({
//     'status': true,
//     'message': '成功',
//   })
// });

module.exports = router;
