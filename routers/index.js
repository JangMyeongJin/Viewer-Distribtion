const express = require("express");
const path = require("path");
const distributionController = require("../controllers/distribution.controllers");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.post("/start", distributionController.startDistribution);

module.exports = router;
