const express = require("express");
const Router = express.Router();
var upload = require("../config/multer.js");
const projetoController = require("../controller/projetoController");

Router.get("/projeto/", projetoController.listarProjetos);

Router.post("/projeto/", projetoController.listarFiltro);

Router.get("/projeto/add", projetoController.abreAdd);

Router.post("/projeto/add", upload.single("foto"), projetoController.add);

Router.get("/projeto/edt/:id", projetoController.abreEdit);

Router.post("/projeto/edt/:id", upload.single("foto"), projetoController.edit);

Router.get("/projeto/del/:id", projetoController.deletar);

module.exports = Router;
