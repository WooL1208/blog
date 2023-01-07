var express = require("express");
var router = express.Router();
require('dotenv').config();

// 後台主頁
router.get("/", function (req, res, next) {
  res.render("backstage/index", { title: 'Backstage'});
});

module.exports = router;
