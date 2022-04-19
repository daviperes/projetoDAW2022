const express = require("express");
const Router = express.Router();
var upload = require("../config/multer.js");
const marcaController = require("../controller/marcaController");

Router.get("/marca/", marcaController.listarmarcas);

Router.post("/marca/", marcaController.listarFiltro);

Router.get("/marca/add", marcaController.abreAdd);

Router.post("/marca/add", upload.single("logo"), marcaController.add);

Router.get("/marca/edt/:id", marcaController.abreEdit);

Router.post("/marca/edt/:id", upload.single("logo"), marcaController.edit);

Router.get("/marca/del/:id", marcaController.deletar);

module.exports = Router;
