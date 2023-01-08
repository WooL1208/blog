var express = require("express");
var router = express.Router();
require('dotenv').config();

/*
  文章管理頁面
  get /article-manager
*/
router.get("/", function (req, res, next) {
  const { token } = req.signedCookies;
  res.render("article-manager/index", { title: '文章管理', token });
});

/*
  文章編輯器
  get /article-manager/editor
  query:
    mode: add => 新增文章
    mode: edit => 編輯文章
    id: => 文章id
*/
router.get("/editor", function (req, res, next) {
  const { mode, id } = req.query;
  console.log(mode);
  console.log(id);
  res.render("article-manager/editor", { title: '文章編輯器', mode });
});

module.exports = router;


