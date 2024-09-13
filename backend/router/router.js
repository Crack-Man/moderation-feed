const express = require('express');
const router = express.Router();
const bulletinsController = require("../controllers/bulletins_controller");

router.get("/bulletins", bulletinsController.getData);
router.post("/decisions", bulletinsController.setDecisions);

module.exports = router;