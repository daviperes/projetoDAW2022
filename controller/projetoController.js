var Projeto = require("../model/Projeto");

function listarProjetos(req, res) {
  Projeto.find({}).then(function (docs) {
    res.render("projeto/list.ejs", { Projetos: docs });
  });
}

function listarFiltro(req, res) {
  Projeto.find({ nome: new RegExp(req.body.pesquisa, "i") }).then(function (
    docs
  ) {
    res.render("projeto/list.ejs", { Projetos: docs });
  });
}

function abreAdd(req, res) {
  res.render("projeto/add.ejs", {});
}

function add(req, res) {
  var projeto = new Projeto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    dataInicio: req.body.dataInicio,
    previsaoTermino: req.body.previsaoTermino,
  });
  if (req.file.filename != "") {
    projeto.foto = req.file.filename;
  }

  projeto.save(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/projeto/");
    }
  });
}

function abreEdit(req, res) {
  Projeto.findById(req.params.id).then(function (docs) {
    console.log(docs);
    res.render("projeto/edit.ejs", { Projeto: docs });
  });
}

function edit(req, res) {
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
}

function deletar(req, res) {
  Projeto.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/projeto/");
    }
  });
}

module.exports = {
  listarProjetos,
  listarFiltro,
  abreAdd,
  add,
  abreEdit,
  edit,
  deletar,
};
