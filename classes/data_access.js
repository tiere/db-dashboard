'use strict';

var database = require('../config/database');

class DataAccess {
  static listTables () {
    return new Promise((resolve, reject) => {
      database.query('SHOW TABLES', (error, rows, fields) => {
        if (error) return reject(error);

        return resolve({ rows, fields });
      });
    });
  }
}

module.exports = DataAccess;
