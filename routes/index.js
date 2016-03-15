var dataAccess = require('../classes/data_access');
var express    = require('express');
var router     = express.Router();

router.get('/', function (req, res, next) {
  dataAccess.listTables().then((result) => {
    res.render('index', { title: 'Express', result });
  });
});

module.exports = router;
