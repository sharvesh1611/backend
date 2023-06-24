const cryptoJs = require('crypto-js');

const encrypt = async function(plainText){
    let cipherText;
    cipherText = cryptoJs.AES.encrypt(plainText.toString(),CONFIG.secretKey).toString();
    return cipherText;
};

const decrypt = async function(cipherText){
    let plainText;
    const bytes = cryptoJs.AES.decrypt(cipherText.toString(),CONFIG.secretKey);
    plainText = bytes.toString(cryptoJs.enc.Utf8);
    return plainText;
}

module.exports={encrypt,decrypt};