const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");

app.use(
  "/",
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
