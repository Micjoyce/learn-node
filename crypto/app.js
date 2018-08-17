const utils = require('./utils')
const keys = require('./keys')

const plaintText = '你好，我是徐巧民'

const crypted = utils.encrypt(plaintText, keys.pubKey) // 加密
console.log(crypted.toString());
const decrypted = utils.decrypt(crypted, keys.privKey) // 解密

console.log(decrypted.toString())