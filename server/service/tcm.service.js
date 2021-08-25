const Tcm = require("../models/tcm.models");

const createTcm = async (tcm = {}) => {
  const newTcm = new Tcm({ ...tcm });
  const savedTcm = await newTcm.save();
  return savedTcm;
};

const deleteTcm = async (tcmId) => {
  return await Tcm.findByIdAndDelete(tcmId);
};

const getTcm = async () => {
  return await Tcm.find();
};

const updateTcm = async (tcmId, tcm = {}) => {
  const updatedTcm = await Tcm.findByIdAndUpdate(tcmId, tcm, { new: true });
};
module.exports = {
  createTcm,
  deleteTcm,
  getTcm,
  updateTcm,
};
