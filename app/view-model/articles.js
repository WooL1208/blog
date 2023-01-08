require('dotenv').config();
var { getArticlesDb, deleteArticleDb } = require('../model/articles');

async function getArticles() {
    const articles = await getArticlesDb();
    return articles;
}

async function deleteArticle(id) {
    const ret = deleteArticleDb(id)
    return ret;
}

module.exports = { getArticles, deleteArticle };