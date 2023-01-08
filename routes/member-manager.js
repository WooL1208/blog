var express = require("express");
var router = express.Router();
require('dotenv').config();

// 會員管理頁面.
router.get("/", function (req, res, next) {
  const { token } = req.signedCookies;
  res.render("member-manager/index", { title: '會員管理', token, admin: req.isAdmin});
});

router.get("/editor", function (req, res, next) {
  const { token } = req.signedCookies;

  if(req.isAdmin === false) {
    return res.redirect("/warning");
  }

  res.render("member-manager/editor", { title: '會員編輯', token, admin: req.isAdmin });
});

module.exports = router;
