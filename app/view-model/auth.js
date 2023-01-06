require('dotenv').config();
var { getAccount } = require('../model/users');
const jwt = require('jsonwebtoken');
var argon2 = require('argon2');

// 產生 token
async function generateAccessToken(account) {
    return jwt.sign({ 'account': account }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
}

// 驗證 token
async function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        return decoded;
    } catch (err) {
        return false;
    }
}

// 登入
async function login(account, password) {
    // 取得符合的帳戶資料
    const retAccount = await getAccount(account);

    // 判斷有沒有這個帳號
    if (retAccount.length != 1) {
        return false;
    }

    // 判斷密碼是否正確
    const user = retAccount[0];
    if (!await argon2.verify(user.password, password)) {
        return false;
    }

    const token = await generateAccessToken(account);
    return token;
}

// 檢查是否為管理員
async function checkIsAdmin(req, res, next) {
    const token = req.signedCookies.token;
    const decoded = await verifyToken(token);
    if (decoded) {
        const retAccount = await getAccount(decoded.account);
        req.isAdmin = Boolean(retAccount[0].is_admin);
    }
    else {
        req.isAdmin = false;
    }
    next();
};


module.exports = { login, checkIsAdmin };