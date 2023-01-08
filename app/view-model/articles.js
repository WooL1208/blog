require('dotenv').config();
var { getArticlesDb, addArticleDb, deleteArticleDb } = require('../model/articles');

async function getArticles() {
    const articles = await getArticlesDb();
    return articles;
}

async function addArticle(title, category, userId, content){
    const ret = addArticleDb(title, category, userId, content);
    return ret;
}

async function deleteArticle(id) {
    const ret = deleteArticleDb(id)
    return ret;
}

module.exports = { getArticles, addArticle, deleteArticle };