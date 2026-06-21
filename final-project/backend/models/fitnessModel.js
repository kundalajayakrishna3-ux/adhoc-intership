const mongoose = require("mongoose");

const FitnessSchema = new mongoose.Schema({
    weight: Number,
    height: Number,
    calories: Number,
    water: Number,
    activity: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(
    "Fitness",
    FitnessSchema
);