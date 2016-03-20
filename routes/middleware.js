var Database = require('../classes/database');
var express  = require('express');
var router   = express.Router();

var database = new Database;

router.use((req, res, next) => {
  database.tables.then((tables) => {
    res.locals.tables = tables;
    next();
  });
});

module.exports = router;
