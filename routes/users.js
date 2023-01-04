var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

/* 
  獲取使用者資訊 
  get /users
*/
router.get('/', async function (req, res, next) {
  const [rows, fields] = await mysql.execute('SELECT id, is_admin, name, account FROM `user`');
  return res.json(rows)
});


/* 
  註冊 
  post /users
*/
router.post('/', async function (req, res, next) {
  const { name, account, password } = req.body;
  const hashedPassword = await argon2.hash(password);

  const [rows, fields] = await mysql.execute('INSERT INTO `user` (is_admin, name, account, password) VALUES (0, ?, ?, ?)', [name, account, hashedPassword]);

  res.redirect('/user/');
});


module.exports = router;
