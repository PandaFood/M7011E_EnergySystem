const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 2048});
process.env.PublicKey = key.exportKey('pkcs8-public');
process.env.PrivateKey = key.exportKey('pkcs8-private');
