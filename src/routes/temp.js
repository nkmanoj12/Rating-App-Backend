const express = require("express");
const { encryptData, decryptData } = require("../cryption");
require("../mongConnection");

const router = new express.Router;

router.get('/temp', function(req, res) {
    const encryption = encryptData("manoj kumar");
    const password = encryption.encryptedData;
    const iv = encryption.iv;
    const decryption = decryptData(password, iv);
    res.send({
        encrypted_password : password,
        iv : iv,
        decrypted_password : decryption
    })
})

module.exports = router;