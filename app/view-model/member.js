require('dotenv').config();
var { getUserDb, deleteUserDb } = require('../model/member');

/**
 * 取得所有使用者資訊
 * @returns {object} 使用者資訊
 */
async function getUser() {
    const users = await getUserDb();
    return users;
}

/**
 * 刪除指定使用者
 * @param {number} id 使用者ID
 * @returns {boolean} 是否刪除成功
 */
async function deleteUser(id) {
    const ret = deleteUserDb(id)
    return ret;
}

module.exports = { getUser, deleteUser };