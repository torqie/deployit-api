const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const db = require('../../database/models');

// Register a user
// =============================================================
exports.register = ((req, res) => {
  // TODO:: Validation.

  console.log("register: ", req.body.password)

  db.User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email address already exists."
      });
    } else {
      const newUser = new db.User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
              .save()
              .then(user => res.status(200).json(user))
              .catch(err => console.log(err));
        });
      });
    }
})});

// Log the user in and return JWT token.
// =============================================================
exports.login = ((req, res) => {
 // TODO: Validation


  const email = req.body.email;
  const password = req.body.password;

  // Find the user by email address.
  db.User.findOne({ email }).then(user => {
    // Check if user exists.
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email address not found."
      });
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if(isMatch) {

        // Create the JWT payload
        const payLoad = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        // Sign The JWT Token
        jwt.sign(payLoad, keys.secretOrKey, {
          expiresIn: 31556926
        }, (err, token) => {
          // Return the token to the client
          res.status(200).json({
            success: true,
            token: token
          })
        })
      } else {
        return res.status(400).json({
          success: false,
          message: "Password Incorrect"
        })
      }
    });
  });
});