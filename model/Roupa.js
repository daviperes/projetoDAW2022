var conexao = require("../config/database");

var RoupaSchema = conexao.Schema({
  nome: { type: "String" },
  tamanho: { type: "String" },
  foto: { type: "String" },
  marca: { type: conexao.Schema.Types.ObjectId, ref: 'Marca' },
});

module.exports = conexao.model("Roupa", RoupaSchema);
