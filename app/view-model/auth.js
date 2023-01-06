require('dotenv').config();
var { promisePool: mysql } = require('../../lib/mysql');
const jwt = require('jsonwebtoken');
var argon2 = require('argon2');

function generateAccessToken(account) {
    return jwt.sign({ 'account': account }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
}

async function login(account, password) {
    // 取得符合的帳戶資料
    const [rows, fields] = await mysql.execute('SELECT * FROM `user` WHERE account = ?', [account]);

    // 判斷有沒有這個帳號
    if (rows.length != 1) {
        return false;
    }

    // 判斷密碼是否正確
    const user = rows[0];
    if (!await argon2.verify(user.password, password)) {
        return false;
    }

    const token = generateAccessToken(account);
    return token;
}

async function register(name, account, password) {
    const hashedPassword = await argon2.hash(password);

    // 檢查帳號是否重複
    const [rows_check, fields_check] = await mysql.execute('SELECT * FROM `user` WHERE account = ?', [account]);
    if (rows_check.length !== 0) {
        return false;
    }

    // 註冊
    const [rows, fields] = await mysql.execute('INSERT INTO `user` (is_admin, name, account, password) VALUES (0, ?, ?, ?)', [name, account, hashedPassword]);

    return true;
}

module.exports = { login, register };