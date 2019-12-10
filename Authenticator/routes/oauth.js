const express = require('express');
const router = express.Router();
const Database = require('../postgres/database');
const jwt = require('../auth/jwt');
const hash = require('../auth/hashing');

router
  .get('/token', function (req, res, next) {
    const input = req.body;
    Database.loginUser(input.email).then((v) => {
      const passwordHash = v.rows[0].password;
      console.log(passwordHash);

      hash.verifyPassword(input.password, passwordHash)
        .then((verified) => {
          if (verified) {
            jwt.sign(input.email).then((v) => {
              res.json({
                cookie: v
              })


            });
          } else {
            res.status(401).send("Login failed");
          }
        })
        .catch((err) => console.log(err));
    })
  });

module.exports = router;