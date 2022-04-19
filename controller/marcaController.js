var Marca = require("../model/Marca");

function listarmarcas(req, res) {
  Marca.find({}).then(function (docs) {
    res.render("marca/list.ejs", { Marcas: docs });
  });
}

function listarFiltro(req, res) {
  Marca.find({ nome: new RegExp(req.body.pesquisa, "i") }).then(function (
    docs
  ) {
    res.render("marca/list.ejs", { Marcas: docs });
  });
}

function abreAdd(req, res) {
  res.render("marca/add.ejs", {});
}

function add(req, res) {
  var marca = new Marca({
    nome: req.body.nome,
  });
  if (req.file.filename != "") {
    marca.logo = req.file.filename;
  }

  marca.save(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/marca/");
    }
  });
}

function abreEdit(req, res) {
  Marca.findById(req.params.id).then(function (docs) {
    console.log(docs);
    res.render("marca/edit.ejs", { Marca: docs });
  });
}

function edit(req, res) {
  Marca.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      logo: req.file.filename,
    },
    function (err, docs) {
      if (err) {
        res.send("Aconteceu um erro:" + err);
      } else {
        res.redirect("/marca/");
      }
    }
  );
}

function deletar(req, res) {
  Marca.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/marca/");
    }
  });
}

module.exports = {
  listarmarcas,
  listarFiltro,
  abreAdd,
  add,
  abreEdit,
  edit,
  deletar,
};
