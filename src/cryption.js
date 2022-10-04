const { createCipheriv, randomBytes, createDecipheriv } = require("crypto");


const algorithm = 'aes-256-cbc';
const key = 'author-manoj-kumar-n-k-manunk-12'

function encryptData(data) {
    const iv = randomBytes(16);
    const cipher = createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    let base64data = Buffer.from(iv, 'binary').toString('base64');
    return {encryptedData : encryptedData, iv : base64data};
}

function decryptData(data, base64data) {
    const iv = Buffer.from(base64data, "base64");
    const decipher = createDecipheriv(algorithm, key, iv);
    let decryptedData = decipher.update(data, "hex", "utf-8");
    decryptedData += decipher.final("utf-8");
    return decryptedData;
}

module.exports = {
    encryptData,
    decryptData
};

