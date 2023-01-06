var { promisePool: mysql } = require('../../lib/mysql');

async function get_account(account) {
    const [rows, fields] = await mysql.execute('SELECT * FROM `user` WHERE account = ?', [account]);
    return rows;
}

async function register_account(name, account, hashedPassword) {
    try {
        const [rows, fields] = await mysql.execute('INSERT INTO `user` (is_admin, name, account, password) VALUES (0, ?, ?, ?)', [name, account, hashedPassword]);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = { get_account, register_account };