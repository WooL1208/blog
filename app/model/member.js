var { promisePool: mysql } = require('../../lib/mysql');

async function getUserDb() {
    const [rows, fields] = await mysql.execute('SELECT `user`.`id`,`user`.`is_admin`, `user`.`name`, `user`.`account` FROM `user`');
    return rows;
}

module.exports = { getUserDb };