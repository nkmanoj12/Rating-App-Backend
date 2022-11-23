const express = require('express');
const schema = require("../schemas/signupSchema")

const router = new express.Router();

router.post('/', async function(req, res) {
    if(req.body.username === null || req.body.username === undefined) {
        res.status(400);
        res.send({statusMessage : "Failure", message : "Username required"});
        return false;
    }
    schema.findOneAndUpdate({username : req.body.username}, {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        contanct : req.body.contanct,
        email : req.body.email
    }, null, function(err, docs) {
        if(err) {
            res.status(400);
            res.send({statusMessage : "Failure", message : err});
            return false;
        }

        if(docs === null) {
            res.status(400);
            res.send({statusMessage : "Failure", message : "User not found"})
            return false;
        }
        res.send({statusMessage : "Success", message : "User details updated successfully"});
    });
    
});

module.exports = router;