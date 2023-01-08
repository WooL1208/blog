require('dotenv').config();
var { getUsersDb, getSingleUserDb, deleteUserDb, editUserDb } = require('../model/member');

/**
 * 取得所有使用者資訊
 * @returns {object} 使用者資訊
 */
async function getUsers() {
    const users = await getUsersDb();
    console.log({'getUsers': users});
    return users;
}

async function getSingleUser(id) {
    const user = await getSingleUserDb(id);
    console.log({'getSingleUser': user});
    return user;
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

async function editUser(id, identity, member) {
    const ret = editUserDb(id, identity, member);
    return ret;
}

module.exports = { getUsers, getSingleUser, deleteUser, editUser };