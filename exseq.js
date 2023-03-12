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
      type: DataTypes.STRING
    }
  });

  // .sync() creates a table if it doesn't exists, else does nothing
  Agendamento.sync().then(
    function (nome, telefone, origem, data, obs){
      Agendamento.create(
        { nome: name },
        { telefone: tel },
        { origem: origin },
        { data: date },
        { obs: obs });
    });
  res.sendFile(__dirname + "/index.html");
})

app.listen(8080);
