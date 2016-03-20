var Database = require('../classes/database');
var express  = require('express');
var router   = express.Router();

var database = new Database;

router.get('/', function (req, res, next) {
  database.tables.then((tables) => {
    res.render('index', { title: 'Express', tables });
  });
});

module.exports = router;
