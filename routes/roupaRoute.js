const express = require("express");
const Router = express.Router();
var upload = require("../config/multer.js");
var roupaController = require("../controller/roupaController");

Router.get("/roupa/", roupaController.listarTudo);

Router.post("/roupa/", roupaController.listarFiltro);

Router.get("/roupa/add", roupaController.abreAdd);

Router.post("/roupa/add", upload.single("foto"), roupaController.add);

Router.get("/roupa/edt/:id", roupaController.abreEdit);

Router.post(
  "/roupa/edt/:id",
  upload.single("foto"),
  roupaController.edita
);

Router.get("/roupa/del/:id", roupaController.deleta);

module.exports = Router;
