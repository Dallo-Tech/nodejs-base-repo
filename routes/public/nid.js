const express = require("express")
const router = express.Router()
const controller = require("../../controllers/public/nidController")
const zodValidator = require("../../middlewares/zodValidator")
const nidSchema = require("../../validations/nidSchema")

router.post("/", zodValidator(nidSchema), controller.createNID)
router.get("/", controller.getAllNID)
router.get("/:nidNumber", controller.getNIDInfo)
router.get("/status/:nidNumber", controller.getNIDStatus)
module.exports = router