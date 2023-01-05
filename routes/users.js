var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
var { promisePool: mysql } = require('../lib/mysql');
const jwt = require('jsonwebtoken');
var argon2 = require('argon2');
require('dotenv').config();

function generateAccessToken(account) {
  return jwt.sign({ 'account': account }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
}

/* 登入頁面 */
router.get("/login", function (req, res, next) {
  res.render("users/login");
});

/* 執行登入 */
router.post('/login', async function (req, res, next) {
  const { account, password } = req.body;

  // 取得符合的帳戶資料
  const [rows, fields] = await mysql.execute('SELECT * FROM `user` WHERE account = ?', [account]);

  // 判斷有沒有這個帳號
  if (rows.length != 1) {
    return res.render("users/login", { error: true });
  }

  // 判斷密碼是否正確
  const user = rows[0];
  if (!await argon2.verify(user.password, password)) {
    return res.render("users/login", { error: true });
  }

  const token = generateAccessToken(account);
  res.cookie("token", token, { signed: true });
  return res.redirect("/");
});

/* 登出 */
router.get("/logout", function (req, res, next) {
  res.clearCookie("token");
  res.redirect("/");
});

/* 註冊*/
router.get("/register", function (req, res, next) {
  res.render("users/register");
});

router.post("/register", async function (req, res, next) {
  const { name, account, password } = req.body;
  const hashedPassword = await argon2.hash(password);

  // 檢查帳號是否重複
  const [rows_check, fields_check] = await mysql.execute('SELECT * FROM `user` WHERE account = ?', [account]);
  if (rows_check.length !== 0) {
    return res.render("users/register", { error: true });
  }

  // 註冊
  const [rows, fields] = await mysql.execute('INSERT INTO `user` (is_admin, name, account, password) VALUES (0, ?, ?, ?)', [name, account, hashedPassword]);
  return res.redirect("/")
});

module.exports = router;
