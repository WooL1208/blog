var { promisePool: mysql } = require('../../lib/mysql');

/**
 * 從DB取得指定文章的留言資訊
 * @param {number} id 文章ID
 * @returns {string} name 留言者名稱
 * @returns {string} content 留言內容
 */
async function getComments(id) {
    const [rows, fields] = await mysql.execute('SELECT * FROM `messages` WHERE article_id = ?', [id]);
    return rows;
}

/**
 * 新增留言
 * @param {number} userId 留言者ID
 * @param {number} articleId 文章ID
 * @param {string} content 留言內容
 * @returns {boolean} 是否新增成功
 */
async function addComment(userId, articleId, content) {
    try {
        const [rows, fields] = await mysql.execute('INSERT INTO `messages` (user_id, article_id, content) VALUES (?, ?, ?)', [userId, articleId, content]);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = { getComments, addComment };