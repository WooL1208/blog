var { getComments, addComment } = require('../model/comments');

/**
 * 取得留言
 * @param {number} id 文章ID
 * @returns {string} name 留言者名稱
 * @returns {string} content 留言內容
 */
async function getComments(id) {
    const comments = await getComments(id);
    return comments;
}

/**
 * 新增留言
 * @param {number} userId 留言者ID
 * @param {number} articleId 文章ID
 * @param {string} content 留言內容
 * @returns {boolean} 是否新增成功
 */
async function addComment(userId, articleId, content) {
    if (await addComment(userId, articleId, content)) {
        return true;
    } else {
        return false;
    }
}

module.exports = { getComments, addComment };