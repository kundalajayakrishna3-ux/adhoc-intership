const Fitness = require("../models/Fitness");

exports.addFitness = async (req, res) => {
  try {
    const data = await Fitness.create(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getFitness = async (req, res) => {
  try {
    const data = await Fitness.find();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};