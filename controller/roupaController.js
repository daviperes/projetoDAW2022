var Roupa = require("../model/Roupa");
var Marca = require("../model/Marca");

function listarTudo(req, res) {
  Roupa.find({})
    .populate({ path: "marca", model: "Marca" })
    .then(function (docs) {
      res.render("roupa/list.ejs", { Roupas: docs });
    });
}

function listarFiltro(req, res) {
  if (req.body.tipo == "nome") {
    Roupa.find({ nome: new RegExp(req.body.pesquisa, "i") }).then(
      function (docs) {
        res.render("roupa/list.ejs", { Roupas: docs });
      }
    );
  } 
}

function abreAdd(req, res) {
  Marca.find({}).then(function (Marcas) {
    res.render("roupa/add.ejs", { Marcas: Marcas });
  });
}

function add(req, res) {
  var roupa = new Roupa({
    nome: req.body.nome,
    tamanho: req.body.tamanho,
    marca: req.body.marca,
  });
  if (req.file.filename != "") {
    roupa.foto = req.file.filename;
  }

  roupa.save(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/roupa/");
    }
  });
}

function abreEdit(req, res) {
  Roupa.findById(req.params.id).then(function (docs) {
    Marca.find({}).then(function (Marcas) {
      res.render("roupa/edit.ejs", { Marcas: Marcas, Roupa: docs });
    });
    //res.render("roupa/edit.ejs", { Roupa: docs });
  });
} 

function edita(req, res) {
  Roupa.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      tamanho: req.body.tamanho,
      foto: req.file.filename,
    },
    function (err, docs) {
      if (err) {
        res.send("Aconteceu um erro:" + err);
      } else {
        res.redirect("/roupa/");
      }
    }
  );
}

function deleta(req, res) {
  Roupa.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/roupa/");
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
