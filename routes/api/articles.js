var express = require("express");
require('dotenv').config();
var { getArticles } = require('../../app/view-model/articles');
var router = express.Router();

/* 
    取得文章
    get /api/articles
*/
router.get('/', async function (req, res, next) {
    const articles = await getArticles();
    return res.json(articles)
});


/* 
    取得文章
    get /api/articles
*/
// router.post('/', async function (req, res, next) {
//     const { account, password } = req.body;
//     const token = await login(account, password);
//     if (token) {
//         res.cookie("token", token, { signed: true });
//         return res.json({ status: true, message: "登入成功" })
//     }
//     else {
//         return res.json({ status: false, message: "登入失敗" })
//     }
// });

// /* 
//     登出 
//     delete /api/auth
// */
// router.delete("/", function (req, res, next) {
//     try {
//         res.clearCookie("token");
//         return res.json({ status: true, message: "登出成功" });
//     } catch (err) {
//         return res.json({ status: false, message: "登出失敗" });
//     }

// });

module.exports = router;