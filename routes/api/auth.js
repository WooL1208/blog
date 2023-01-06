var express = require("express");
require('dotenv').config();
var { login } = require('../../app/view-model/auth');
var router = express.Router();

/* 
    登入 
    post /api/auth
*/
router.post('/', async function (req, res, next) {
    const { account, password } = req.body;
    const token = await login(account, password);
    if (token) {
        res.cookie("token", token, { signed: true });
        return res.json({ status: true, message: "登入成功" })
    }
    else {
        return res.json({ status: false, message: "登入失敗" })
    }
});

/* 
    登出 
    delete /api/auth
*/
router.delete("/", function (req, res, next) {
    res.clearCookie("token");
    res.redirect("/");
});

module.exports = router;