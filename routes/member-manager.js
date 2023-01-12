var express = require("express");
var router = express.Router();
require('dotenv').config();

// 會員管理頁面.
router.get("/", function (req, res, next) {
  if(req.isAdmin === false) {
    return res.redirect("/warning");
  }
  
  res.render("member-manager/index", { title: '會員管理', isLoggedIn: req.isLoggedIn, isAdmin: req.isAdmin });
});

router.get("/editor", function (req, res, next) {
  if (req.isAdmin === false) {
    return res.redirect("/warning");
  }

  res.render("member-manager/editor", { title: '會員編輯', isLoggedIn: req.isLoggedIn, isAdmin: req.isAdmin });
});

module.exports = router;
