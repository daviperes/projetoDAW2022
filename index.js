//imports
var express = require("express");
var app = express();
var path = require("path");
//imports

//configs
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
//configs

//importando rotas
const usuarioRoute = require("./routes/usuarioRoute");
const projetoRoute = require("./routes/projetoRoute");
//importando rotas

app.use("/", usuarioRoute);
app.use("/", projetoRoute);

app.listen("3000", function () {
  console.log("O servidor foi iniciado na porta 3000");
});
