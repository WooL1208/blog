var express = require("express");
var router = express.Router();
require('dotenv').config();

// 會員管理頁面.
router.get("/", function (req, res, next) {
  const { token } = req.signedCookies;
  res.render("member-manager/index", { title: '會員管理', token});
});

module.exports = router;
