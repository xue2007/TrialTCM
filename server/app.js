const express = require("express");
const Mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;

app.get("/ping", (req, res, next) => {
  return res.send("You have successfully connected to the server");
});

app.use("/trialApp", routes);

app.use((req, res, next) => {
  const err = errorFormatter("Route not found", NOT_FOUND);
  return next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || INTERNAL_SERVER_ERROR;

  //   console.log(err.message);
  return res.status(status).json({
    status: status,
    message: err.message,
  });
});

Mongoose.connect(
  "mongodb+srv://user1:trialApp@cluster0.7rhsn.mongodb.net/user1?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
)
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on 8080`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
