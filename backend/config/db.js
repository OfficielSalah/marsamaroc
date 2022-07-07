const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://" +
    process.env.DB_USER_PASS +
    "@marsamaroc.y0qokzg.mongodb.net/test",
  (err) => {
    if (!err) console.log("Connected to MongoDB");
    else console.log("Failed to connect to MongoDB");
  }
);
