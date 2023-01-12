var express = require("express");
var router = express.Router();
require('dotenv').config();

// 登入頁面
router.get("/", function (req, res, next) {
  res.render("userdata/index", { title: '會員資料', isLoggedIn: req.isLoggedIn, isAdmin: req.isAdmin});
});

module.exports = router;
