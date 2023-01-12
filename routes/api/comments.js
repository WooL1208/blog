var express = require("express");
require('dotenv').config();
var {getComments, addComment} = require('../../app/view-model/comments');
var router = express.Router();

/*
    取得留言
    get /api/comments
*/
router.get('/', async function (req, res, next) {
    const { id } = req.query;
    const comments = await getComments(id);

    return res.json(comments)
});

/*
    新增留言
    post /api/comments
*/
router.post('/', async function (req, res, next) {
    const { userId, articleId, content } = req.body;

    if (await addComment(userId, articleId, content)) {
        return res.json({ status: true, message: "留言成功" })
    }
    else {
        return res.json({ status: false, message: "留言失敗" })
    }
});

/*
    刪除留言
    delete /api/comments
*/
router.delete("/", async function (req, res, next) {
    const { id } = req.body;

    if (await deleteComment(id)) {
        return res.json({ status: true, message: "刪除成功" });
    } else {
        return res.json({ status: false, message: "刪除失敗" });
    }
});

module.exports = router;