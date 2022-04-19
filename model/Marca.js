var conexao = require("../config/database");

var MarcaSchema = conexao.Schema({
  nome: { type: "String" },
  logo: { type: "String" },
  roupas: [conexao.Schema.Types.ObjectId],
});

module.exports = conexao.model("Marca", MarcaSchema);
