/*
  SERVER easy express CRUD generator tesztelése 
*/

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const CRUD = require("easy-express-crud-generator");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb+srv://Test:Test@cluster0-avzbv.mongodb.net/Test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/****************************************
 * CRUD hívások kezelése
 ****************************************/
const userRouter = new CRUD(require("./model/userModel")).getRouter(
  express.Router()
);
const versenyRouter = new CRUD(require("./model/versenyModel")).getRouter(
  express.Router()
);
const eredmenyRouter = new CRUD(require("./model/eredmenyModel")).getRouter(
  express.Router()
);

const testRouter = new CRUD(require("./model/testModel")).getRouter(
  express.Router()
);
const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/country", versenyRouter);
apiRouter.use("/eredmeny", eredmenyRouter);
apiRouter.use("/test", testRouter);

app.use(apiRouter);

/****************************************
 * Nem kezelt kérések kezelése
 ****************************************/

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
