const express = require("express");
const Router = express.Router();
var Projeto = require("../model/Projeto");
var upload = require("../config/multer.js");

//rota para listar dados
Router.get("/projeto/", function (req, res) {
  Projeto.find({}).then(function (docs) {
    res.render("projeto/list.ejs", { Projetos: docs });
  });
});

Router.post("/projeto/", function (req, res) {
  Projeto.find({ nome: new RegExp(req.body.pesquisa, "i") }).then(function (
    docs
  ) {
    res.render("projeto/list.ejs", { Projetos: docs });
  });
});

//rota de abrir tela do add
Router.get("/projeto/add", function (req, res) {
  res.render("projeto/add.ejs", {});
});
//fim abrir tela de add

//adicionar dados no banco
Router.post("/projeto/add", upload.single("foto"), function (req, res) {
  var projeto = new Projeto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    dataInicio: req.body.dataInicio,
    previsaoTermino: req.body.previsaoTermino,
  });
  if (req.file.filename != "") {
    usuario.foto = req.file.filename;
  }

  projeto.save(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/projeto/");
    }
  });
});
//fim adicionar dados no banco

Router.get("/projeto/edt/:id", function (req, res) {
  Projeto.findById(req.params.id).then(function (docs) {
    console.log(docs);
    res.render("projeto/edit.ejs", { Projeto: docs });
  });
});

Router.post("/projeto/edt/:id", upload.single("foto"), function (req, res) {
  Projeto.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      descricao: req.body.descricao,
      dataInicio: req.body.dataInicio,
      previsaoTermino: req.body.previsaoTermino,
      foto: req.file.filename,
    },
    function (err, docs) {
      if (err) {
        res.send("Aconteceu um erro:" + err);
      } else {
        res.redirect("/projeto/");
      }
    }
  );
});

Router.get("/projeto/del/:id", function (req, res) {
  Projeto.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/projeto/");
    }
  });
});

module.exports = Router;
