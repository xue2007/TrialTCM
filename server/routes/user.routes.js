const router = require("express").Router();
const User = require("../models/user.model");
const { createUser, deleteUser, getUser } = require("../service/user.service");

router.post("/send-data", async (req, res, next) => {
  let user;
  try {
    user = await createUser({ ...body });
  } catch (err) {
    return next(err);
  }
});

router.post("/delete", async (req, res) => {
  let user;
  try {
    user = await deleteUser(req.body.id);
  } catch {
    return next(err);
  }
});

router.post("/update/:userId", async (req, res) => {
  User.findByIdAndUpdate(req.params.userId, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    salary: req.body.salary,
    position: req.body.position,
    picture: req.body.picture,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/get", async (req, res, next) => {
  let user;
  try {
    user = await getUser();
  } catch (err) {
    return next(err);
  }
});
module.exports = router;
