const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");
//const userRoute = require('./route/userRoute')

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://admin:Pongika13@192.168.0.40/', {
mongoose.connect(
  "mongodb+srv://Test:Test@cluster0-avzbv.mongodb.net/Test?retryWrites=true&w=majority",
  {
    //mongoose.connect('/test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", require("./route/userRoute"));
app.use("/verseny", require("./route/versenyRoute"));
app.use("/eredmeny", require("./route/eredmenyRoute"));

app.use(
  "/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  })
);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.message = "Invalid route";
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} port`);
});
