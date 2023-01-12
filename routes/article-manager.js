var express = require("express");
var router = express.Router();
require('dotenv').config();

/**
 * 文章管理頁面
 * get /article-manager
 */
router.get("/", function (req, res, next) {
  if(req.isAdmin === false) {
    return res.redirect("/warning");
  }

  res.render("article-manager/index", { title: '文章管理', isLoggedIn: req.isLoggedIn, isAdmin: req.isAdmin });
});


/**
 * 文章編輯器
 * get /article-manager/editor
 * @url-query {string} mode 新增或編輯文章:
 * - add: 新增文章
 * - edit: 編輯文章
 * @url-query {string} id 文章id
 */
router.get("/editor", function (req, res, next) {
  if(req.isAdmin === false) {
    return res.redirect("/warning");
  }

  res.render("article-manager/editor", { title: '文章編輯器', isLoggedIn: req.isLoggedIn, isAdmin: req.isAdmin });
});

module.exports = router;


