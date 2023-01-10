var express = require("express");
require('dotenv').config();
var { getArticles, addArticle, editArticle, deleteArticle } = require('../../app/view-model/articles');
var router = express.Router();

/*
    取得文章
    get /api/articles
*/
router.get('/', async function (req, res, next) {
    const { id, title, category } = req.query;
    const articles = await getArticles(id, title, category);
    return res.json(articles)

});

/*
    新增文章
    delete /api/articles
*/
router.post("/", async function (req, res, next) {
    const { title, category, content } = req.body;

    if(req.isAdmin === false) {
        return res.json({ status: false, message: "新增失敗" });
    }

    const ret = await addArticle(title, category, req.userId, content);
    if (ret) {
        return res.json({ status: true, message: "新增成功" });
    } else {
        return res.json({ status: false, message: "新增失敗" });
    }

});

/*
    修改文章
    put /api/articles
*/
router.put("/", async function (req, res, next) {
    const { id, title, category, content } = req.body;

    if(req.isAdmin === false) {
        return res.json({ status: false, message: "修改失敗" });
    }

    const ret = await editArticle(id, title, category, content);
    if (ret) {
        return res.json({ status: true, message: "修改成功" });
    } else {
        return res.json({ status: false, message: "修改失敗" });
    }
});

/*
    刪除文章
    delete /api/articles
*/
router.delete("/", async function (req, res, next) {
    const { id } = req.body;

    if(req.isAdmin === false) {
        return res.json({ status: false, message: "刪除失敗" });
    }

    const ret = await deleteArticle(id);
    if (ret) {
        return res.json({ status: true, message: "刪除成功" });
    } else {
        return res.json({ status: false, message: "刪除失敗" });
    }

});


module.exports = router;