// const { MongoClient } = require("mongodb");

const { mongoose } = require("mongoose");


mongoose.connect("mongodb://localhost:27017/RatingAPP", function(err, client) {
    if(client) {
        db = client;
        console.log("DB Connected");
    }
    else {
        console.log(err);
    }
});

// MongoClient.connect("mongodb://localhost:27017", function(err, client) {
//     if(err) {
//         console.log("DB connection error : ", err);
//         return false;
//     }
//     db = client.db("RatingAPP");
//     console.log("DB Connected");
// });