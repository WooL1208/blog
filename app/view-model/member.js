require('dotenv').config();
var { getUserDb, deleteUserDb } = require('../model/member');

async function getUser() {
    const users = await getUserDb();
    return users;
}

async function deleteUser(id) {
    const ret = deleteUserDb(id)
    return ret;
}

module.exports = { getUser, deleteUser };