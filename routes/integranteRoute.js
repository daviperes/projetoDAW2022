const express = require("express");
const Router = express.Router();
var Integrante = require("../model/Integrante");
var upload = require("../config/multer.js");

//rota para listar dados
Router.get("/integrante/", function (req, res) {
  Integrante.find({}).then(function (docs) {
    res.render("integrante/list.ejs", { Integrantes: docs });
  });
});

Router.post("/integrante/", function (req, res) {
  if (req.body.tipo == "nome") {
    Integrante.find({ nome: new RegExp(req.body.pesquisa, "i") }).then(
      function (docs) {
        res.render("integrante/list.ejs", { Integrantes: docs });
      }
    );
  } else {
    Integrante.find({ email: new RegExp(req.body.pesquisa, "i") }).then(
      function (docs) {
        res.render("integrante/list.ejs", { Integrantes: docs });
      }
    );
  }
});

//rota de abrir tela do add
Router.get("/integrante/add", function (req, res) {
  res.render("integrante/add.ejs", {});
});

//adicionar dados no banco
Router.post("/integrante/add", upload.single("foto"), function (req, res) {
  var integrante = new Integrante({
    nome: req.body.nome,
    email: req.body.email,
    endereco: req.body.endereco,
    senha: req.body.senha,
  });
  if (req.file.filename != "") {
    integrante.foto = req.file.filename;
  }

  integrante.save(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/integrante/");
    }
  });
});
//fim adicionar dados no banco

Router.get("/integrante/edt/:id", function (req, res) {
  Integrante.findById(req.params.id).then(function (docs) {
    console.log(docs);
    res.render("integrante/edit.ejs", { Integrante: docs });
  });
});

Router.post("/integrante/edt/:id", upload.single("foto"), function (req, res) {
  Integrante.findByIdAndUpdate(
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
        res.redirect("/integrante/");
      }
    }
  );
});

Router.get("/integrante/del/:id", function (req, res) {
  Integrante.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/integrante/");
    }
  });
});

module.exports = Router;
