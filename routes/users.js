var express = require("express");
var router = express.Router();
require('dotenv').config();

/* 登入頁面 */
router.get("/login", function (req, res, next) {
  res.render("users/login", { title: 'Login'});
});

/* 註冊頁面*/
router.get("/register", function (req, res, next) {
  res.render("users/register", { title: 'Register'});
});



module.exports = router;
