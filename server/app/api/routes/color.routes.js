const express = require("express");

const router = express.Router();

// funciones que ahora voy a crear en controller 
const { getAllColors, getColorById } = require("../controllers/color.controller");

router.get("/", getAllColors);
router.get("/:colorId", getColorById);

module.exports = router;