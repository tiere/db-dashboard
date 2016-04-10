'use strict';

class Table {
  constructor (name, dbConnection) {
    this._dbConnection = dbConnection;
    this.name          = name;
  }

  get rows () {
    return new Promise((resolve, reject) => {
      this._dbConnection.query(`SELECT * FROM ${this.name}`, (error, rows, fields) => {
        if (error) reject(error);

        return resolve({ rows, fields });
      });
    });
  }
}

module.exports = Table;
