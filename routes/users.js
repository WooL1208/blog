var express = require("express");
var router = express.Router();
var { login, register } = require('../app/view-model/auth');
require('dotenv').config();

/* 登入頁面 */
router.get("/login", function (req, res, next) {
  res.render("users/login");
});

/* 執行登入 */
router.post('/login', async function (req, res, next) {
  const { account, password } = req.body;
  const token = await login(account, password);
  if (token) {
    res.cookie("token", token, { signed: true });
    return res.redirect("/");
  }
  else {
    return res.render("users/login", { error: true });
  }
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

  if (await register(name, account, password)) {
    return res.redirect("/");
  }
  else {
    return res.render("users/register", { error: true });
  }
});

module.exports = router;
