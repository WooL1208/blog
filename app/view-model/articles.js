require('dotenv').config();
var { getArticlesDb, addArticleDb, editArticleDb, deleteArticleDb } = require('../model/articles');


/**
 * 取得指定的文章
 * @param {number} id 文章ID
 * @param {number} title 文章標題
 * @param {number} category 文章分類
 * @returns {object} 文章資料
 */
async function getArticles(id, title, category) {
    const articles = await getArticlesDb(id, title, category);
    return articles;
}

/**
 * 新增文章
 * @param {string} title 文章標題
 * @param {string} category 文章分類
 * @param {number} userId 文章作者ID
 * @param {string} content 文章內容
 * @returns {boolean} 是否新增成功
 */
async function addArticle(title, category, userId, content) {
    const ret = addArticleDb(title, category, userId, content);
    return ret;
}

/**
 * 修改指定文章
 * @param {number} id 文章ID
 * @param {string} title 文章標題
 * @param {string} category 文章分類
 * @param {string} content 文章內容
 * @returns {boolean} 是否修改成功
 */
async function editArticle(id, title, category, content) {
    const ret = editArticleDb(id, title, category, content);
    return ret;
}

/**
 * 刪除指定文章
 * @param {number} id 文章ID
 * @returns {boolean} 是否刪除成功
 */
async function deleteArticle(id) {
    const ret = deleteArticleDb(id)
    return ret;
}

module.exports = { getArticles, addArticle, editArticle, deleteArticle };