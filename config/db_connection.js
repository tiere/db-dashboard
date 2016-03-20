var config = require('./config');
var mysql  = require('mysql');

var dbConnection = mysql.createConnection({
  host:     config.db.host,
  user:     config.db.user,
  password: config.db.password,
  database: config.db.database
});

module.exports = dbConnection;
