const express = require("express");

const router = new express.Router();

router.post("/", async function(req, res) {
    if(req.body.username === null || req.body.username === undefined) {
        res.status(400);
        res.send({statusMessage : "Failure", message : "Username required"});
        return false;
    }

    const dataCount = await db.collection("users").find({username : req.body.username}).count();
    if(dataCount != 0) {
        res.status(400);
        res.send({statusMessage : "Failure", message : "Username not available"});
        return false;
    }

    res.send({statusMessage : "Success", message : "Username available"});
})

module.exports = router;