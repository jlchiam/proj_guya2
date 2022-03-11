const mysql = require("mysql");
const dotenv = require("dotenv").config();

/*
DBHOST=137.132.92.94
DBUSER=fintechlab
DBPASSWD=FinTechLab
DBPORT=12865
DBNAME=b16_group3

let connection = mysql.createConnection({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWD,
  database: process.env.DBNAME,
});
*/
let connection = mysql.createConnection({
  host: "137.132.92.94",
  port: "12865",
  user: "fintechlab",
  password: "FinTechLab",
  database: "b16_group3"
});

connection.connect((error) => {
  if (error) console.log(error);
  else console.log("Connected to MySQL!");
});

module.exports = { connection };
