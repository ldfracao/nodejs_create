const db = require('./database')

// define model for Agendamentos table
const Agendamento = db.sequelize.define('Agendamento', {
  nome: {
    type: db.DataTypes.STRING
  },
  telefone: {
    type: db.DataTypes.STRING
  },
  origem: {
    type: db.DataTypes.STRING
  },
  data: {
    type: db.DataTypes.DATE
  },
  obs: {
    type: db.DataTypes.TEXT
  }
});

Agendamento.sync();

module.exports = Agendamento
