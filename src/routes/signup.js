const express = require("express");
const { encryptData } = require("../cryption");
const schema = require("../schemas/signupSchema");

const router = new express.Router;

router.post("/signup", async function(req, res) {
    // try {
        // const user = schema.find();
        // console.log(user);
        // schema.find({contanct : req.body.contanct}, function (err, docs) {
        //     if(err) {
        //         res.send(err);
        //         return false;
        //     }
        //     console.log(docs);
        // }).count();

        // const query = schema.find(function (err, docs) {
        //     if(err) {
        //         console.log(err);
        //         return false;
        //     }
            // return docs;
        //     console.log(docs);
        // });
        // const query = schema.find().count();
        // const count = query.count(async function(err, sum) {
        //     if(err) {
        //         console.log(err);
        //         return false;
        //     }
        //     console.log(sum);
        //     // return sum;
        // })
        // const count = query.count();
        // if(count == 0) {
        //     console.log(count);
        //     console.log("hii");
        // }
        // else {
        //     console.log(count);
        //     console.log("Hello");
        // }
        // console.log(query);
        // const docs = schema.find().count();
        // console.log(docs);
        // query.count(function (err, count) {
        //     if(err) {
        //         console.log(err);
        //         return false;
        //     }
        //     const userFound = count;
        // });

        // console.log(userFound);

        // schema.find({}, function (err, docs) {
        //     if(err) {
        //         console.log(err);
        //         return false;
        //     }
        //     console.log(docs);
        // });
        // console.log(this.documents);
        
        // if(userFound === 0) {
        //     const encrpytion = cryption.encryptData(req.body.password);
        //     console.log(encrpytion);
        // }
    let user = await db.collection("users").find({"contanct" : req.body.contanct}).count();
    if(user != 0) {
        res.send({statusCode : 400, statusMessage : "Failure", message : "Mobile Number aleredy registered in DB"})
        return false
    }
    
    user = await db.collection("users").find({"email" : req.body.email}).count();
    if(user != 0) {
        res.send({statusCode : 400, statusMessage : "Failure", message : "E-Mail aleready registered in DB"})
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
        username : req.body.username,
        password : password,
        iv : iv
    });
    await insertUser.save();
    res.send({statusCode : 200, statusMessage : "Success", message : "User Stored in DB"});
    // }
    
    // catch {
        // res.send({statusCode : 400, statusMessage : "Failure", message : "Error while storing to DB"})
    // }
})

module.exports = router;