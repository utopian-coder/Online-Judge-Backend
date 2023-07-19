const express = require("express");
const submissionController = require("./../controllers/submissionController");

const router = express.Router();

router.route("/").post(submissionController.submit);

module.exports = router;
