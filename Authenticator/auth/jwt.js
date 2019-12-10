const jwt = require('jsonwebtoken');

const TokenHandler = {
  verify: async function(){


  },

  sign: async function(name){
    return jwt.sign({
      data: 'foobar',
      name: name
    }, process.env.PrivateKey, { expiresIn: '1d' });
  },

}

module.exports = TokenHandler;