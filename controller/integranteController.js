var Integrante = require("../model/Integrante");
var Projeto = require("../model/Projeto");

function listarTudo(req, res) {
  Integrante.find({})
    .populate({ path: "projeto", model: "Projeto" })
    .then(function (docs) {
      res.render("integrante/list.ejs", { Integrantes: docs });
    });
}

function listarFiltro(req, res) {
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
}

function abreAdd(req, res) {
  Projeto.find({}).then(function (projetos) {
    res.render("integrante/add.ejs", { Projetos: projetos });
  });
}

function add(req, res) {
  var integrante = new Integrante({
    nome: req.body.nome,
    email: req.body.email,
    endereco: req.body.endereco,
    senha: req.body.senha,
    projeto: req.body.projeto,
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
}

function abreEdit(req, res) {
  Integrante.findById(req.params.id).then(function (docs) {
    console.log(docs);
    res.render("integrante/edit.ejs", { Integrante: docs });
  });
}

function edita(req, res) {
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
}

function deleta(req, res) {
  Integrante.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/integrante/");
    }
  });
}

module.exports = {
  listarTudo,
  listarFiltro,
  abreAdd,
  add,
  abreEdit,
  edita,
  deleta,
};
