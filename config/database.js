const mongoose = require("mongoose");

const uri =
  "mongodb+srv://daviperes:peresdavi@apiestudo.v7h80.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
