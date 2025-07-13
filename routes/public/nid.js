const router = require("express").Router();
const upload = require("../../middlewares/upload");
const nidController = require("../../controllers/public/nidController");

router
  .post("/", nidController.postForm)
  .get("/:id", nidController.getDetails);

module.exports = router;
