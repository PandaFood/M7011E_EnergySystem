const jwt = require('jsonwebtoken');

const TokenHandler = {
  verify: async function(){


  },

  sign: async function(){

    jwt.sign({
      data: 'foobar'
    }, process.env.PrivateKey, { expiresIn: '1d' });

  },

}