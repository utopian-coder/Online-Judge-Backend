const express = require("express");
const router = express.Router();

const problemController = require("../controllers/problemController");

router.route("/").get(problemController.getProblem);

module.exports = router;
