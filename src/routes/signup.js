const express = require("express");
const { encryptData } = require("../cryption");
const schema = require("../schemas/signupSchema");

const router = new express.Router;

router.post("/", async function(req, res) {
    let user = await db.collection("users").find({"contanct" : req.body.contanct}).count();
    if(user != 0) {
        res.status(400);
        res.send({statusMessage : "Failure", message : "Mobile Number aleredy registered in DB"})
        return false
    }
    
    user = await db.collection("users").find({"email" : req.body.email}).count();
    if(user != 0) {
        res.status(400);
        res.send({statusMessage : "Failure", message : "E-Mail aleready registered in DB"})
        return false
    }

    user = await db.collection("users").find({"username" : req.body.username}).count();
    if(user != 0) {
        res.status(400);
        res.send({statusMessage : "Failure", message : "username not available"})
        return false
    }

    let encrpytion = encryptData(req.body.password);
    const password = encrpytion.encryptedData;
    const iv = encrpytion.iv;
    const insertUser = schema({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        contanct : req.body.contanct,
        email : req.body.email,
        role : "freeUser",
        username : req.body.username,
        password : password,
        iv : iv
    });
    await insertUser.save();
    res.send({statusMessage : "Success", message : "User Stored in DB"});
})

module.exports = router;