const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator"); //validates user
const bcrypt = require("bcryptjs");

//@route    GET api/auth
//@desc     Test route
//@access   Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/auth
//@desc     Authenticate user & get token
//@access   Public
router.post(
  "/",
  [
    //use express-validator to validate --> nicely shows where errors are if any
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if we have error --> bad request (400)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });
      //if user does not exist --> error
      if (!user) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //if password does not match --> error
      const isMatch = await bcrypt.compare(password, user.password); //compare password typed in to password stored in user
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //return jsonwebtoken (JWT) --> makes transferring data via JSON objects secure
      const payload = {
        user: {
          id: user.id,
        },
      };

      //sign the token
      jwt.sign(
        payload, //payload
        config.get("jwtSecret"), //secret
        { expiresIn: 360000 },
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
