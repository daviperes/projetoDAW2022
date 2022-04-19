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
const marcaRoute = require("./routes/marcaRoute");
const roupaRoute = require("./routes/roupaRoute");
//importando rotas

app.get("/", function (req, res) {
  res.render("index.ejs", {});
});
app.post("/", function (req, res) {});

app.use("/", usuarioRoute);
app.use("/", marcaRoute);
app.use("/", roupaRoute);

app.listen("3000", function () {
  console.log("O servidor foi iniciado na porta 3000");
});
