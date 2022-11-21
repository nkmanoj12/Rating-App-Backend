const express = require('express');
const { decryptData } = require('../cryption');

const router = new express.Router;

router.get('/', async function(req, res) {
    const dataCount = await db.collection("users").find({"$or" : [{"contanct" : req.body.username}, {"email" : req.body.username}, {"username" : req.body.username}]}).count();
    if(dataCount === 0) {
        res.status(401);
        res.send({statusMessage : "Failure", message : "User not found"})
        return false;
    }
    const data = await db.collection("users").find({"$or" : [{"contanct" : req.body.username}, {"email" : req.body.username}, {"username" : req.body.username}]}).toArray();
    if(req.body.password === decryptData(data[0].password, data[0].iv)) {
        res.send({statusMessage : "Success", message : "Username and password are correct"});
        return true;
    }
    res.status(401);
    res.send({statusMessage : "Failure", message : "Password is not correct"})

    // const data = await db.collection("users").find({"$or" : [{"contanct" : req.body.username}, {"email" : req.body.username}, {"username" : req.body.username}]}).toArray();
    // res.send(data);
})

module.exports = router;