var express = require('express');
require('dotenv').config();
var { promisePool: mysql } = require('../../lib/mysql');
var { register } = require('../../app/view-model/users');
var router = express.Router();

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
router.post("/", async function (req, res, next) {
  const { name, account, password } = req.body;

  if (await register(name, account, password, 0)) {
      return res.json({ status: true, message: '註冊成功' });
  }
  else {
      return res.json({ status: false, message: '註冊失敗' });
  }
});

module.exports = router;
