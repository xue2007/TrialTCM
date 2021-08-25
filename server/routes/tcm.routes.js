const router = require("express").Router();

const {
  getTcm,
  deleteTcm,
  createTcm,
  updateTcm,
} = require("../service/tcm.service");

router.post("/post", async (req, res, next) => {
  let tcm;
  const body = req.body;
  try {
    tcm = await createTcm({ ...body });
  } catch (err) {
    return next(err);
  }
});

router.post("/delete", async (req, res) => {
  let tcm;
  try {
    tcm = await deleteTcm(req.body.id);
  } catch {
    return next(err);
  }
});

router.post("/update/:tcmId", async (req, res, next) => {
  const body = req.body;
  let tcm;
  try {
    tcm = await updateTcm(req.params.tcmId, { ...body });
  } catch (err) {
    return next(err);
  }
});

router.get("/get", async (req, res, next) => {
  let tcm;
  try {
    tcm = await getTcm();
  } catch (err) {
    return next(err);
  }
  res.send(tcm);
});

module.exports = router;
