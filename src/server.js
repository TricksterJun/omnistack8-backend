// Chamando as dependências
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// Chamando as rotas
const routes = require("./routes");

// Criando o servidor com express
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);

const connectedUsers = {}

io.on('connection', socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id
})

// Conectando ao banco de dados mongodb
mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-eccmn.mongodb.net/omnistack8?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

// Middleware para o controller
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
})

// Dizendo para o servidor utilizar o CORS, JSON no express e as rotas
app.use(cors());
app.use(express.json());
app.use(routes);

// Dizendo para o servidor escutar na devida porta
server.listen(3333);
