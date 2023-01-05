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

module.exports = router;
