const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const indexRouter = require("./routes/index");
const db = require("./models");
db.sequelize.sync();
const app = express();
const swaggerui = require("swagger-ui-express");

const { createTestRole } = require("./utils/db/createRoleUtil");

const swaggerFile = require("./swagger_output.json");
const { createTestUser } = require("./utils/db/createUserUtil");
const {
  createTestResourcePermission,
} = require("./utils/db/createResourcePermission");
const { API } = require("./constant/API");
const fs = require("fs");

if (!fs.existsSync(`./${API.FILE_STORE_FOLDER}`)) {
  fs.mkdirSync(`./${API.FILE_STORE_FOLDER}`);
}
app.use(
  "/api-docs",
  swaggerui.serve,
  swaggerui.setup(swaggerFile, false, { defaultModelsExpandDepth: -1 })
);

(async () => {
  try {
    // await msSqlDb.sequelize.authenticate();
    // await msSqlDb.sequelize.sync();
    await db.sequelize.authenticate();
    console.log("Database connection established successfully.");
    await db.sequelize.sync();
    await createTestRole();
    await createTestResourcePermission();
    if (process.env.NODE_ENV !== "production") {
      await createTestUser();
    }
  } catch (e) {
    console.log(e);
  }
})();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.options("*", cors());
app.use("", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page

  res.status(err ? err.status || 500 : 500).json({
    status: err ? err.status || 500 : 500,
    data: "An Error Occurred",
    message: "Not Found",
    ...(req.app.get("env") === "development" && {
      devStack: err.stack,
    }),
  });
});

module.exports = app;
