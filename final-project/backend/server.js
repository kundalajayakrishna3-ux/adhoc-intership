const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
"mongodb://127.0.0.1:27017/fitnessplanner"
)
.then(()=>{
console.log("MongoDB Connected");
});

const FitnessSchema =
new mongoose.Schema({

weight:Number,

height:Number,

calories:Number,

water:Number,

activity:String,

date:{
type:Date,
default:Date.now
}

});

const Fitness =
mongoose.model(
"Fitness",
FitnessSchema
);

app.post(
"/api/fitness",
async(req,res)=>{

const log =
new Fitness(req.body);

await log.save();

res.json({
message:"Saved"
});

});

app.get(
"/api/fitness",
async(req,res)=>{

const logs =
await Fitness.find();

res.json(logs);

});

app.listen(
5000,
()=>{
console.log(
"Server Running On Port 5000"
);
});