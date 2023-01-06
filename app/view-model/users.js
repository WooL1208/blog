﻿require('dotenv').config();
var { getAccount, registerAccount } = require('../model/users');
var argon2 = require('argon2');

// 註冊帳號
async function register(name, account, password) {
    const hashedPassword = await argon2.hash(password);

    // 檢查帳號是否重複
    const ret_account = await getAccount(account);
    if (ret_account.length !== 0) {
        return false;
    }

    // 註冊
    if (await registerAccount(name, account, hashedPassword)) {
        return true;
    } else {
        return false;
    }
}

module.exports = { register };