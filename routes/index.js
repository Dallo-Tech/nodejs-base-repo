const express = require("express");
const router = express.Router();
const API = require("../constant/API").API;
const authRouter = require("./auth");
const publicRouter = require("./public");
const privateRouter = require("./private");
const infoRouter = require("./public/nid/index")
const jwtTokenAuthentication = require("../middlewares/jwtTokenAuthentication");


router.use("/api/v1/auth/", authRouter);
router.use("/api/v1/public/", publicRouter);
router.use("/api/v1/nid/", infoRouter.router)

router.use(
  "/api/v1/private/",
  jwtTokenAuthentication.authenticateToken,
  privateRouter
);

module.exports = router;
