const { Router } = require("express");

const router = Router();
const userRoute = require("./user.routes");
const tcmRoute = require("./tcm.routes");

router.get("/ping", (req, res, next) => {
  return res.send("Successfully inside routes");
});

router.use("/user", userRoute);

router.use("/tcm", tcmRoute);

module.exports = router;
