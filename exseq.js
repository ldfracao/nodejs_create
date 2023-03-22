// require calls
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql');
const handlebars = require("express-handlebars").engine;

// create an instance of the express module
const app = express();

app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

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

// create a sequelize object
const sequelize = new Sequelize('sistemaweb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// initialize express to parse form data to JSON
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// sends html file as response
app.get("/", (req, res) => {
  res.render("index")
});
app.post("/", async (req, res) => {
  const name = req.body.name;
  const tel = req.body.tel;
  const origin = req.body.origin;
  const date = req.body.date;
  const obs = req.body.obs;

  // define model for Agendamentos table
  const Agendamento = sequelize.define('Agendamento', {
    nome: {
      type: DataTypes.STRING
    },
    telefone: {
      type: DataTypes.STRING
    },
    origem: {
      type: DataTypes.STRING
    },
    data: {
      type: DataTypes.DATE
    },
    obs: {
      type: DataTypes.TEXT
    }
  });

  await Agendamento.sync();

  // insert data into Agendamentos table
  await Agendamento.create({
    nome: name,
    telefone: tel,
    origem: origin,
    data: date,
    obs: obs
  });

  res.render("index")
});

app.listen(8080);
