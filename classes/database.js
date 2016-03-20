'use strict';

var dbConnection = require('../config/db_connection');
var Table        = require('./table');

class Database {
  constructor () {
    this._dbConnection = dbConnection;
    this.tables        = this._getTables();
  }

  _getTables () {
    var _tables = [];

    return new Promise((resolve, reject) => {
      this._dbConnection.query('SHOW TABLES', (error, rows, fields) => {
        if (error) return reject(error);

        for (let row of rows) {
          _tables.push(new Table(row[fields[0].name]));
        }

        this._dbConnection.end();

        return resolve(_tables);
      });
    });
  }
}

module.exports = Database;
