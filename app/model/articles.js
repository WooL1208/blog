var { promisePool: mysql } = require('../../lib/mysql');

/**
 * 從DB取得所有文章
 * @returns {object} 文章資料
 */
async function getArticlesDb() {
    const [rows, fields] = await mysql.execute('SELECT article.id, title, category, user_id, user.name, user.account, content, create_time FROM `article` INNER JOIN `user` ON article.user_id = user.id');
    return rows;
}


/**
 * 從DB取得指定文章
 * @param {number} id 文章ID
 * @returns {object} 文章資料
 */
async function getSingleArticleDb(id) {
    const [rows, fields] = await mysql.execute('SELECT article.id, title, category, user_id, user.name, user.account, content, create_time FROM `article` INNER JOIN `user` ON article.user_id = user.id WHERE article.id = ?', [id]);
    return rows[0];
}

/**
 * 新增文章至DB
 * @param {string} title 文章標題
 * @param {string} category 文章分類
 * @param {number} userId 文章作者ID
 * @param {string} content 文章內容
 * @returns {boolean} 是否新增成功
 */
async function addArticleDb(title, category, userId, content) {
    const [rows, fields] = await mysql.execute('INSERT INTO `article` (title, category, user_id, content, create_time) VALUES (?, ?, ?, ?, now())', [title, category, userId, content]);
    if (rows.affectedRows === 0) {
        return false;
    } else {
        return true;
    }
}

/**
 * 從DB修改指定文章
 * @param {number} id 文章ID
 * @param {string} title 文章標題
 * @param {string} category 文章分類
 * @param {string} content 文章內容
 * @returns {boolean} 是否修改成功
 */
async function editArticleDb(id, title, category, content) {
    const [rows, fields] = await mysql.execute('UPDATE `article` SET title = ?, category = ?, content = ? WHERE id = ?', [title, category, content, id]);
    if (rows.affectedRows === 0) {
        return false;
    } else {
        return true;
    }
}

/**
 * 從DB刪除指定文章
 * @param {number} id 文章ID
 * @returns {boolean} 是否刪除成功
 */
async function deleteArticleDb(id) {
    const [rows, fields] = await mysql.execute('DELETE FROM `article` WHERE id = ?', [id]);
    if (rows.affectedRows === 0) {
        return false;
    } else {
        return true;
    }
}

module.exports = { getArticlesDb, getSingleArticleDb, addArticleDb, editArticleDb, deleteArticleDb };