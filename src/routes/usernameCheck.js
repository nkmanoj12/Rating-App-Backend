const express = require("express");

const router = new express.Router();

router.get("/", async function(req, res) {
    if(req.body.username === null || req.body.username === undefined) {
        res.send({statusCode : 400, statusMessage : "Failure", message : "Username required"});
        return false;
    }

    const dataCount = await db.collection("users").find({username : req.body.username}).count();
    if(dataCount != 0) {
        res.send({statusCode : 400, statusMessage : "Failure", message : "Username not available"});
        return false;
    }

    res.send({statusCode : 200, statusMessage : "Success", message : "Username available"});
})

module.exports = router;