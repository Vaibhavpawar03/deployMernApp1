// const mongoose = require("mongoose");

// const mongo_url = process.env.MONGO_CONN;

// mongoose.connect(mongo_url)
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url, {
    family: 4
})
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log(err);
    });