const mongoose = require("mongoose");
const Campground = require("./../models/campground");
const campgrounds = require("./huts");

mongoose
    .connect("mongodb://localhost:27017/ToThePeak")
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => console.log(e));
const db = mongoose.connection;

for (let campground of campgrounds) {
    campground.author = "681e04d6c9a3a2d721528ec2";
}

const seed = async () => {
    await Campground.deleteMany({});
    await Campground.insertMany(campgrounds);
    await db.close();
};

seed();
