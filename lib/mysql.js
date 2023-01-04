const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env['MYSQL_HOST'] ?? 'localhost',
  user: process.env['MYSQL_USER'] ?? 'root',
  password: process.env['MYSQL_PASSWORD'] ?? 'root',
  database: process.env['MYSQL_DB'] ?? 'blog',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

module.exports = { pool, promisePool };
