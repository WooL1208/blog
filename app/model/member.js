var { promisePool: mysql } = require('../../lib/mysql');

async function getUserDb() {
    const [rows, fields] = await mysql.execute('SELECT `user`.`id`,`user`.`is_admin`, `user`.`name`, `user`.`account` FROM `user`');
    return rows;
}

async function deleteUserDb(id) {
    const [rows, fields] = await mysql.execute('DELETE FROM `user` WHERE id = ?', [id]);
    if (rows.affectedRows === 0) {
        return false;
    } else {
        return true;
    }
}

module.exports = { getUserDb, deleteUserDb };