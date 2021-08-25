const User = require("../models/user.model");

const createUser = async (user = {}) => {
  const newUser = new User({ ...user });
  const savedUser = await newUser.save();
  return savedUser;
};

const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

const getUser = async () => {
  return await User.find();
};
module.exports = {
  createUser,
  deleteUser,
  getUser,
};
