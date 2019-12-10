const argon = require('argon2');

const HashManager = {

  hashPassword: async function (password) {
    const hash = await argon.hash(password);
    return hash;
  },

  verifyPassword: async function (passwordInput, passwordHash) {
    console.log(passwordInput);
    console.log(passwordHash);
    if (await argon.verify(passwordHash, passwordInput)) {
      return true;
    } else {
      return false;
    }
  },
}

module.exports = HashManager;