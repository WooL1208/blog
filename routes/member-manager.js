var express = require("express");
var router = express.Router();
require('dotenv').config();
var { promisePool: mysql } = require('../lib/mysql');

// 會員管理頁面.
router.get("/", function (req, res, next) {
  const { token } = req.signedCookies;
  res.render("member-manager/index", { title: '會員管理', token});
});

router.get('/fetch', async function(req, res, next) {
  const [rows, fields] = await mysql.execute(
      'SELECT `user`.`id`,`user`.`is_admin`, `user`.`name`, `user`.`account` '+
      'FROM `user` ');
  
  return res.status(200).json({
      'status': true,
      'data': rows,
  });
});

module.exports = router;
