require('dotenv').config();
var { getUserDb } = require('../model/member');

async function getUser() {
    const users = await getUserDb();
    return users;
}

module.exports = { getUser };