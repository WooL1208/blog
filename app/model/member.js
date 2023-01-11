var { promisePool: mysql } = require('../../lib/mysql');

/**
 * 從DB取得所有使用者資訊
 * @returns {object} 使用者資訊
 */
async function getUsersDb(isAdmin='', name='') {
    const [rows, fields] = await mysql.execute('SELECT `users`.`id`,`users`.`is_admin`, `users`.`name`, `users`.`account` FROM `users` WHERE users.is_admin LIKE ? AND users.name LIKE ?', [`%${isAdmin}%`, `%${name}%`]);
    return rows;
}

async function getSingleUserDb(id) {
    const [rows, fields] = await mysql.execute('SELECT `users`.`id`,`users`.`is_admin`, `users`.`name`, `users`.`account` FROM `users` WHERE users.id = ?', [id]);
    return rows[0];
}

/**
 * 從DB刪除指定使用者
 * @param {string} id 使用者ID
 * @returns {boolean} 是否刪除成功
 */
async function deleteUserDb(id) {
    const [rows, fields] = await mysql.execute('DELETE FROM `users` WHERE id = ?', [id]);
    if (rows.affectedRows === 0) {
        return false;
    } else {
        return true;
    }
}

async function editUserDb(id, identity, member) {
    const [rows, fields] = await mysql.execute('UPDATE `users` SET is_admin = ?, name = ? WHERE id = ?', [identity, member, id]);
    if (rows.affectedRows === 0) {
        return false;
    } else {
        return true;
    }
}

module.exports = { getUsersDb, getSingleUserDb, deleteUserDb, editUserDb };