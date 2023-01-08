var { promisePool: mysql } = require('../../lib/mysql');

async function getArticlesDb() {
    const [rows, fields] = await mysql.execute('SELECT * FROM `article`');
    return rows;
}

module.exports = { getArticlesDb };