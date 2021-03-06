const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator"); //validates user

//user model
const User = require("../../models/User");

//@route    POST api/users
//@desc     Register user
//@access   Public
router.post(
  "/",
  [
    //using express-validator to validate info user puts in
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if we have error --> bad request (400)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //else --> destructure from body
    const { name, email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });

      //if user already exists --> error
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      //else --> get users gravatar
      const avatar = gravatar.url(email, {
        s: "200", //default size
        r: "pg", //rating
        d: "mm", //default image
      });

      //create user
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt); //create hash for passwd
      await user.save(); //saved to db

      const payload = {
        user: {
          id: user.id,
        },
      };

      //jsonwebtoken (JWT) --> makes transferring data via JSON objects secure
      //sign the token
      jwt.sign(
        payload, //payload
        config.get("jwtSecret"), //secret
        { expiresIn: 360000 },
        //if token is valid --> send token
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
