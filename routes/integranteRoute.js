const express = require("express");
const Router = express.Router();
var upload = require("../config/multer.js");
var integranteController = require("../controller/integranteController");

Router.get("/integrante/", integranteController.listarTudo);

Router.post("/integrante/", integranteController.listarFiltro);

Router.get("/integrante/add", integranteController.abreAdd);

Router.post("/integrante/add", upload.single("foto"), integranteController.add);

Router.get("/integrante/edt/:id", integranteController.abreEdit);

Router.post(
  "/integrante/edt/:id",
  upload.single("foto"),
  integranteController.edita
);

Router.get("/integrante/del/:id", integranteController.deleta);

module.exports = Router;
