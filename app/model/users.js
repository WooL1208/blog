var { promisePool: mysql } = require('../../lib/mysql');

/**
 * 從DB取得指定帳號資訊
 * @param {string} account 帳號
 * @returns {object} 帳號資訊
 */
async function getAccount(account) {
    const [rows, fields] = await mysql.execute('SELECT * FROM `users` WHERE account = ?', [account]);
    return rows;
}

/**
 * 註冊帳號
 * @param {string} name 使用者名稱
 * @param {string} account 帳號
 * @param {string} hashedPassword 雜湊密碼
 */
async function registerAccount(name, account, hashedPassword, isAdmin) {
    try {
        const [rows, fields] = await mysql.execute('INSERT INTO `users` (is_admin, name, account, password) VALUES (?, ?, ?, ?)', [isAdmin, name, account, hashedPassword]);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = { getAccount, registerAccount };