// require calls
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// create an instance of the express module
const app = express();

// create a sequelize object
const sequelize = new Sequelize('sistemaweb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// initialize express to parse form data to JSON
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// sends html file as response
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// handles form post request
app.post("/", (req, res) => {
  const name = req.body.name;
  console.log("Nome", name);

  const Agendamento = sequelize.define('Agendamento', {
    nome: {
      type: DataTypes.STRING
    }

  });
  Agendamento.sync().then(
    function (nome){
      Agendamento.create({ nome: name });
    });

  res.sendFile(__dirname + "/index.html");
})

app.listen(8080);
