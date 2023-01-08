require('dotenv').config();
var { getArticlesDb } = require('../model/articles');

async function getArticles() {
    const articles = await getArticlesDb();
    return articles;
}

module.exports = { getArticles };