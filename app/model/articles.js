var { promisePool: mysql } = require('../../lib/mysql');

async function getArticlesDb() {
    const [rows, fields] = await mysql.execute('SELECT article.id, title, category, user_id, user.name, user.account, create_time FROM `article` INNER JOIN `user` ON article.user_id = user.id');
    return rows;
}

module.exports = { getArticlesDb };