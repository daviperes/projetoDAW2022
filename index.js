//imports
var express = require("express");
var app = express();
var Usuario = require("./model/Usuario");
var Projeto = require("./model/Projeto");
var path = require("path");
var upload = require("./config/multer.js");
//imports

//configs
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
//configs

//rota para listar dados
app.get("/usuario/", function (req, res) {
  Usuario.find({}).then(function (docs) {
    res.render("usuario/list.ejs", { Usuarios: docs });
  });
});

app.post("/usuario/", function (req, res) {
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
app.get("/usuario/add", function (req, res) {
  res.render("usuario/add.ejs", {});
});
//fim abrir tela de add

//rota de abrir tela do add
app.get("/projeto/add", function (req, res) {
  res.render("projeto/add.ejs", {});
});
//fim abrir tela de add

//adicionar dados no banco
app.post("/usuario/add", upload.single("foto"), function (req, res) {
  var usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    foto: req.file.filename,
  });

  usuario.save(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/usuario/");
    }
  });
});
//fim adicionar dados no banco

//adicionar dados no banco
app.post("/projeto/add", upload.single("foto"), function (req, res) {
  var projeto = new Projeto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    dataInicio: req.body.dataInicio,
    previsaoTermino: req.body.previsoTermino,
    foto: req.file.filename,
  });

  projeto.save(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/projeto/");
    }
  });
});
//fim adicionar dados no banco

app.get("/usuario/edt/:id", function (req, res) {
  Usuario.findById(req.params.id).then(function (docs) {
    console.log(docs);
    res.render("usuario/edit.ejs", { Usuario: docs });
  });
});

app.post("/usuario/edt/:id", upload.single("foto"), function (req, res) {
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

app.get("/usuario/del/:id", function (req, res) {
  Usuario.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/usuario/");
    }
  });
});

app.listen("3000", function () {
  console.log("O servidor foi iniciado na porta 3000");
});
