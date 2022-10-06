const express = require('express');
const schema = require("../schemas/signupSchema")

const router = new express.Router();

router.post('/', async function(req, res) {
    if(req.body.username === null || req.body.username === undefined) {
        res.send({statusCode : 400, statusMessage : "Failure", message : "Username required"});
        return false;
    }
    schema.findOneAndUpdate({username : req.body.username}, {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        contanct : req.body.contanct,
        email : req.body.email
    }, null, function(err, docs) {
        if(err) {
            res.send({statusCode : 400, statusMessage : "Failure", message : err});
            return false;
        }

        if(docs === null) {
            res.send({statusCode : 400, statusMessage : "Failure", message : "User not found"})
            return false;
        }
        res.send({statusCode : 200, statusMessage : "Success", message : "User details updated successfully"});
    });
    
});

module.exports = router;