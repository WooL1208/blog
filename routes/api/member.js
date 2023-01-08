var express = require("express");
require('dotenv').config();
var { getUser} = require('../../app/view-model/member');
var router = express.Router();

/* 
    取得會員資訊
    get /api/member
*/
router.get('/', async function (req, res, next) {
    const users = await getUser();
    return res.json(users)
});

/* 
    刪除會員
    delete /api/member
*/
// router.delete("/", async function (req, res, next) {
//     const { id } = req.body;
//     const ret = await deleteArticle(id);
//     if (ret) {
//         return res.json({ status: true, message: "刪除成功" });
//     }else{
//         return res.json({ status: false, message: "刪除失敗" });
//     }
    
// });



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



module.exports = router;