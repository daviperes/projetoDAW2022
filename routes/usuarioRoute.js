const express = require("express");
const Router = express.Router();
var upload = require("../config/multer.js");
var usuarioController = require("../controller/usuarioController");

Router.get("/usuario/", usuarioController.listaUsuarios);

Router.post("/usuario/", usuarioController.listarFiltro);

Router.get("/usuario/add", usuarioController.abreAdd);

Router.post("/usuario/add", upload.single("foto"), usuarioController.add);

Router.get("/usuario/edt/:id", usuarioController.abreEdit);

Router.post("/usuario/edt/:id", upload.single("foto"), usuarioController.edita);

Router.get("/usuario/del/:id", usuarioController.deleta);

module.exports = Router;
