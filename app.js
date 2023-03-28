// require calls
const express = require('express');
const handlebars = require("express-handlebars").engine;
const post = require('./models/post')
// const bodyParser = require('body-parser')
// create an instance of the express module
const app = express();

app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// initialize express to parse form data to JSON
app.use(express.urlencoded({extended : false}));
app.use(express.json());

// sends handlebars file as response
app.get("/", (req, res) => {
  res.render("index")
});

// form post request
app.post("/cadastrar", async (req, res) => {

  // insert data into Agendamentos table
post.create({
    nome: req.body.name,
    telefone: req.body.tel,
    origem: req.body.origin,
    data: req.body.date,
    obs: req.body.obs
  });

  res.render("index")
});

app.listen(8080);
