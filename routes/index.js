var express = require('express');
var router  = express.Router();

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/tables/:table/rows', function (req, res, next) {
  var table = res.locals.tables.find(x => x.name === req.params.table);

  table.rows.then((result) => {
    res.json(result);
  });
});

module.exports = router;
