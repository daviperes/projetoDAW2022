var Usuario = require("../model/Usuario");

function listaUsuarios(req, res) {
  Usuario.find({}).then(function (docs) {
    res.render("usuario/list.ejs", { Usuarios: docs });
  });
}

function listarFiltro(req, res) {
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
}

function abreAdd(req, res) {
  res.render("usuario/add.ejs", {});
}

function add(req, res) {
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
}

function abreEdit(req, res) {
  Usuario.findById(req.params.id).then(function (docs) {
    console.log(docs);
    res.render("usuario/edit.ejs", { Usuario: docs });
  });
}

function edita(req, res) {
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
}

function deleta(req, res) {
  Usuario.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/usuario/");
    }
  });
}

module.exports = {
  listaUsuarios,
  listarFiltro,
  abreAdd,
  add,
  abreEdit,
  edita,
  deleta,
};
