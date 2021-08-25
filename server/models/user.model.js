const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  phone: String,
  salary: String,
  position: String,
});

module.exports = Mongoose.model("User", userSchema);
