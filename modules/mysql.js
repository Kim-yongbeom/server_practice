const mysql = require("mysql2");
const mysqlConfig = require("../config/mysqlConfig");

const con = mysql.createPool(mysqlConfig);

module.exports = con;
