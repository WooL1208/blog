var express = require('express');
var { promisePool: mysql } = require('../../lib/mysql');
var router = express.Router();
var argon2 = require('argon2');

/*
  獲取使用者資訊
  get /api/users
*/
router.get('/', async function (req, res, next) {
  const [rows, fields] = await mysql.execute('SELECT id, is_admin, name, account FROM `user`');
  return res.json(rows)
});


/*
  測試用
  get /api/users/test
*/
router.get('/test', async function (req, res, next) {
  const [rows, fields] = await mysql.execute('SELECT * FROM `user` WHERE account = ?', ['test2']);
  if (rows.length !== 0) {
    return res.json(
      {
        'status': false,
        'message': '失敗',
      }
    )
  } else {
    return res.json(
      {
        'status': true,
        'message': '成功',
      }
    )
  }
});


/*
  註冊
  post /api/users
*/
router.post('/', async function (req, res, next) {
  const { name, account, password } = req.body;
  const hashedPassword = await argon2.hash(password);

  // 檢查帳號是否重複
  const [rows_check, fields_check] = await mysql.execute('SELECT * FROM `user` WHERE account = ?', [account]);
  if (rows_check.length !== 0) {
    return res.json(
      {
        'status': false,
        'message': '失敗',
      }
    )
  }

  // 註冊
  const [rows, fields] = await mysql.execute('INSERT INTO `user` (is_admin, name, account, password) VALUES (0, ?, ?, ?)', [name, account, hashedPassword]);
  return res.json(
    {
      'status': true,
      'message': '成功',
    }
  )
});


module.exports = router;
