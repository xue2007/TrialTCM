const Mongoose = require("mongoose");

const tcmSchema = new Mongoose.Schema({
  name: String,
  zucheng: String,
  gongyong: String,
  zhuzhi: String,
  fangjie: String,
  shiyongzhuyi: String,
  fangge: String,
  picture: String,
});

module.exports = Mongoose.model("Tcm", tcmSchema);
