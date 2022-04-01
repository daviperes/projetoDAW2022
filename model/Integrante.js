var conexao = require("../config/database");

var IntegranteSchema = conexao.Schema({
  nome: { type: "String" },
  email: { type: "String" },
  endereco: { type: "String" },
  foto: { type: "String" },
  projeto: { type: conexao.Schema.Types.ObjectId },
});

module.exports = conexao.model("Integrante", IntegranteSchema);
