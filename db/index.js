
const mongoose = require("mongoose");

const url = process.env.MONGO_URL;


async function connectDb() {
  mongoose
    .connect(url)
    .then(() => console.log("Database connected"))
    .catch(() => console.error("Connection error"));
}

module.exports = { connectDb };
