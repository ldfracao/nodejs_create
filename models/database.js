const mysql = require('mysql')
const { Sequelize, DataTypes } = require('sequelize')

// create database connection
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

// connect and create database sistemaweb
con.connect(function(err){
  if(err) throw err;
  console.log("Connection successful.");
  con.query("CREATE DATABASE IF NOT EXISTS sistemaweb", function(err, result){
    if(err) throw err;
    console.log("Database created");
    con.end();
  });
});

const sequelize = new Sequelize('sistemaweb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  DataTypes: DataTypes
}
