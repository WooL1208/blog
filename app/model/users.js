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
 * 從DB取得指定帳號資訊
 * @param {string} id 帳號ID
 * @returns {object} 帳號資訊
 */
async function getAccountByIdDb(id) {
    const [rows, fields] = await mysql.execute('SELECT * FROM `users` WHERE id = ?', [id]);
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

/**
 * 更新帳號資訊
 * @param {number} id 帳號ID
 * @param {string} name 使用者名稱
 * @param {string} hashedPassword 雜湊密碼
 */
async function updateAccountDb(id, name, hashedPassword) {

    if(name){
        try {
            const [rows, fields] = await mysql.execute('UPDATE `users` SET name = ? WHERE id = ?', [name, id]);
        } catch (err) {
            return false;
        }
    }
    if(hashedPassword){
        try {
            const [rows, fields] = await mysql.execute('UPDATE `users` SET password = ? WHERE id = ?', [hashedPassword, id]);
        } catch (err) {
            return false;
        }
    }
    return true;
}

module.exports = { getAccount, registerAccount, updateAccountDb, getAccountByIdDb };