// Chamando as dependências 
const express = require("express");
const routes = express.Router();

// Chamando os Controllers
const DevController = require("./controllers/DevController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

// Configurando como o app se comportará para cada requisição nas rotas
routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);

routes.post("/devs/:devId/likes", LikeController.store);
routes.post("/devs/:devId/dislikes", DislikeController.store);

module.exports = routes;
