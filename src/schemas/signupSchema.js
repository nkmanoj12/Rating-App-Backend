
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const signupSchema = new schema ({
    firstname : {type : String},
    lastname : {type : String},
    contanct : {type : Number},
    email : {type : String},
    username : {type : String},
    password : {type : String},
    iv : {type : String}
},
{
    versionKey : false
});

module.exports = mongoose.model("users", signupSchema);