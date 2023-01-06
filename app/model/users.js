var { promisePool: mysql } = require('../../lib/mysql');

// 取得帳號資料
async function getAccount(account) {
    const [rows, fields] = await mysql.execute('SELECT * FROM `user` WHERE account = ?', [account]);
    return rows;
}

// 註冊帳號
async function registerAccount(name, account, hashedPassword) {
    try {
        const [rows, fields] = await mysql.execute('INSERT INTO `user` (is_admin, name, account, password) VALUES (0, ?, ?, ?)', [name, account, hashedPassword]);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = { getAccount, registerAccount };