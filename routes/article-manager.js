var express = require("express");
var router = express.Router();
require('dotenv').config();

// 後台主頁
router.get("/", function (req, res, next) {
  const { token } = req.signedCookies;
  res.render("article-manger/index", { title: '文章管理', token});
});

module.exports = router;
