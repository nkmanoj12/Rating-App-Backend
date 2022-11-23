const express = require('express');
const { decryptData, encryptData } = require('../cryption');
const schema = require('../schemas/signupSchema');

const router = new express.Router();

router.post('/', async function(req, res) {
    if(req.body.username === null || req.body.username === undefined) {
        res.status(400);
        res.send({statusMessage : "Failure", message : "Username required"});
        return false;
    }

    const dataCount = await db.collection("users").find({"username" : req.body.username}).count();
    if(dataCount != 1) {
        res.status(400);
        res.send({statusMessage : "Failure", message : "User not found"})
        return false;
    }

    if(req.body.currentPassword === null || req.body.currentPassword === undefined) {
        res.status(400);
        res.send({statusMessage : "Failure", message : "Current Password required"});
        return false;
    }

    const data = await db.collection("users").find({"username" : req.body.username}).toArray();
    if(decryptData(data[0].password, data[0].iv) != req.body.currentPassword) {
        res.status(400);
        res.send({statusMessage : "Failure", message : "Cutrrent Password is not correct"})
        return false;
    }

    if(req.body.newPassword === null || req.body.newPassword == undefined) {
        res.status(400);
        res.send({statusMessage : "Failure", message : "New password required"});
        return false;
    }

    const encryption = encryptData(req.body.newPassword);
    const password = encryption.encryptedData;
    const iv = encryption.iv;

    schema.findOneAndUpdate({"username" : req.body.username}, {
        password : password,
        iv : iv
    }, null, function(err, docs) {
        if(err) {
            res.status(400);
            res.send({statusMessage : "Failure", message : err});
            return false;
        }
        res.send({statusMessage : "Success", message : "Password updated successfully"});
    })
});

module.exports = router;