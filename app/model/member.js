var { promisePool: mysql } = require('../../lib/mysql');

/**
 * 從DB取得所有使用者資訊
 * @returns {object} 使用者資訊
 */
async function getUserDb() {
    const [rows, fields] = await mysql.execute('SELECT `user`.`id`,`user`.`is_admin`, `user`.`name`, `user`.`account` FROM `user`');
    return rows;
}


/**
 * 從DB刪除指定使用者
 * @param {string} id 使用者ID
 * @returns {boolean} 是否刪除成功
 */
async function deleteUserDb(id) {
    const [rows, fields] = await mysql.execute('DELETE FROM `user` WHERE id = ?', [id]);
    if (rows.affectedRows === 0) {
        return false;
    } else {
        return true;
    }
}

module.exports = { getUserDb, deleteUserDb };