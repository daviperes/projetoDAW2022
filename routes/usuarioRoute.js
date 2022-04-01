const express = require("express");
const Router = express.Router();
var Usuario = require("../model/Usuario");
var upload = require("../config/multer.js");

//rota para listar dados
Router.get("/usuario/", function (req, res) {
  Usuario.find({}).then(function (docs) {
    res.render("usuario/list.ejs", { Usuarios: docs });
  });
});

Router.post("/usuario/", function (req, res) {
  if (req.body.tipo == "nome") {
    Usuario.find({ nome: new RegExp(req.body.pesquisa, "i") }).then(function (
      docs
    ) {
      res.render("usuario/list.ejs", { Usuarios: docs });
    });
  } else {
    Usuario.find({ email: new RegExp(req.body.pesquisa, "i") }).then(function (
      docs
    ) {
      res.render("usuario/list.ejs", { Usuarios: docs });
    });
  }
});

//rota de abrir tela do add
Router.get("/usuario/add", function (req, res) {
  res.render("usuario/add.ejs", {});
});

//adicionar dados no banco
Router.post("/usuario/add", upload.single("foto"), function (req, res) {
  var usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    endereco: req.body.endereco,
    senha: req.body.senha,
  });
  if (req.file.filename != "") {
    usuario.foto = req.file.filename;
  }

  usuario.save(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/usuario/");
    }
  });
});
//fim adicionar dados no banco

Router.get("/usuario/edt/:id", function (req, res) {
  Usuario.findById(req.params.id).then(function (docs) {
    console.log(docs);
    res.render("usuario/edit.ejs", { Usuario: docs });
  });
});

Router.post("/usuario/edt/:id", upload.single("foto"), function (req, res) {
  Usuario.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      foto: req.file.filename,
    },
    function (err, docs) {
      if (err) {
        res.send("Aconteceu um erro:" + err);
      } else {
        res.redirect("/usuario/");
      }
    }
  );
});

Router.get("/usuario/del/:id", function (req, res) {
  Usuario.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/usuario/");
    }
  });
});

module.exports = Router;
