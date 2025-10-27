const express = require("express");
const router = express.Router()
const firmController = require("../controllers/firmController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/addfirm", verifyToken, firmController.addFirm);

module.exports = router;

