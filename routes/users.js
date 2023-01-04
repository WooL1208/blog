var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  // res.send('respond with a resource');
  const [rows, fields] = await mysql.execute('SELECT * FROM `user`');
  return res.json({
    'rows': rows,
  })
});


module.exports = router;
