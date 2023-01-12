var express = require('express');
require('dotenv').config();
var { promisePool: mysql } = require('../../lib/mysql');
var { register, updateAccount } = require('../../app/view-model/users');
var router = express.Router();

/*
  獲取使用者資訊
  get /api/users
*/
router.get('/', async function (req, res, next) {
  const [rows, fields] = await mysql.execute('SELECT id, is_admin, name, account FROM `users`');
  return res.json(rows)
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

/**
 * 更新帳號資訊
 * put /api/users
 */
router.put("/", async function (req, res, next) {
  const { name, oldPassword, newPassword } = req.body;

  if (await updateAccount(req.userId, name, oldPassword, newPassword)) {
    return res.json({ status: true, message: '修改成功' });
  }
  else {
    return res.json({ status: false, message: '修改失敗' });
  }
});

module.exports = router;
