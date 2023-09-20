const express = require("express");
var nodemailer = require("nodemailer");

const router = new express.Router;

let OTP;

let transporter = nodemailer.createTransport({
    // host : "smtp.ethereal.email",
    // port : 587,
    // secure : false,
    // auth : {
    //     user : "dbienyokonhw7b4e@ethereal.email",
    //     pass : "R5V4ADT5GfeR4MgA45"
    // }
    service : 'Gmail',
    auth : {
        user : 'manojnkm1212@gmail.com',
        pass : 'fehcdxgnmydpcjsi'
    }
})

let mailOptions = {
    from : "manojnkm1212@gmail.com",
    to : "manu.coder12@gmail.com",
    subject : "OTP",
    text : "Dear Manoj, Your OTP " + OTP + " to reset your password"
}

function getSixDigitsOTP() {
    OTP = Math.floor(1000 + (Math.random() * 9000));
}

router.get("/", async function(req, res) {
    getSixDigitsOTP();
    // let testAccount = await nodemailer.createTestAccount();

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            res.status(409).send({statusMessage : "Failure", message : err})
            return false;
        }

        res.send({statusMessage : "Success", message : info});
    })
})

module.exports = router;
