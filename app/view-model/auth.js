require('dotenv').config();
var { get_account } = require('../model/users');
const jwt = require('jsonwebtoken');
var argon2 = require('argon2');

async function generateAccessToken(account) {
    return jwt.sign({ 'account': account }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
}

async function login(account, password) {
    // 取得符合的帳戶資料
    const ret_account = await get_account(account);

    // 判斷有沒有這個帳號
    if (ret_account.length != 1) {
        return false;
    }

    // 判斷密碼是否正確
    const user = ret_account[0];
    if (!await argon2.verify(user.password, password)) {
        return false;
    }

    const token = await generateAccessToken(account);
    return token;
}

module.exports = { login };