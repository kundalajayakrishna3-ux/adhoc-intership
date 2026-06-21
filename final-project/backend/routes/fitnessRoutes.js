const express = require("express");
const router = express.Router();

const {
  addFitness,
  getFitness,
} = require("../controllers/fitnessController");

router.post("/", addFitness);
router.get("/", getFitness);

module.exports = router;