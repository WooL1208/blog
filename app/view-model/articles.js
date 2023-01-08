require('dotenv').config();
var { getArticlesDb, getSingleArticleDb, addArticleDb, editArticleDb, deleteArticleDb } = require('../model/articles');

/*
    取得所有文章
*/
async function getArticles() {
    const articles = await getArticlesDb();
    return articles;
}

/*
    取得指定文章
*/
async function getSingleArticle(id) {
    const article = await getSingleArticleDb(id);
    return article;
}

/*
    新增文章
*/
async function addArticle(title, category, userId, content) {
    const ret = addArticleDb(title, category, userId, content);
    return ret;
}

/*
    修改指定文章
*/
async function editArticle(id, title, category, content) {
    const ret = editArticleDb(id, title, category, content);
    return ret;
}

/*
    刪除指定文章
*/
async function deleteArticle(id) {
    const ret = deleteArticleDb(id)
    return ret;
}

module.exports = { getArticles, getSingleArticle, addArticle, editArticle, deleteArticle };