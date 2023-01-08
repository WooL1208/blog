﻿var { promisePool: mysql } = require('../../lib/mysql');

async function getArticlesDb() {
    const [rows, fields] = await mysql.execute('SELECT article.id, title, category, user_id, user.name, user.account, content, create_time FROM `article` INNER JOIN `user` ON article.user_id = user.id');
    return rows;
}

async function addArticleDb(title, category, userId, content) {
    const [rows, fields] = await mysql.execute('INSERT INTO `article` (title, category, user_id, content, create_time) VALUES (?, ?, ?, ?, now())', [title, category, userId, content]);
    return rows;
}

async function deleteArticleDb(id) {
    const [rows, fields] = await mysql.execute('DELETE FROM `article` WHERE id = ?', [id]);
    if (rows.affectedRows === 0) {
        return false;
    } else {
        return true;
    }
}

module.exports = { getArticlesDb, addArticleDb, deleteArticleDb };