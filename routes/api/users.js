const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const db = require("../../config/db");

const regValidation = require("../../validation/register");
const loginValidation = require("../../validation/login");
//@route   GET api/users/test

router.get("/test", (req, res) => res.json({ msg: "User works" }));

//@route POST api/users/register

router.post("/register", (req, res) => {
  const { errors, isValid } = regValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  db.query(
    `SELECT COUNT(*) AS cnt FROM user WHERE email = ? `,
    req.body.email,
    function (err, data) {
      if (err) {
        throw err;
      }
      if (data[0].cnt) {
        return res.status("400").json({ email: "email already exist!" });
      } else {
        const newUser = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
          organizationName: req.body.organizationName,
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            var query = db.query("INSERT INTO user SET ?", newUser, function (
              err,
              result
            ) {
              if (err) {
                throw err;
              }
              return res
                .status("200")
                .json({ message: "Thanks for Registration" });
            });
          });
        });
      }
    }
  );
});

//@route POST api/users/login

router.post("/login", (req, res) => {
  const { errors, isValid } = loginValidation(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  db.query(`SELECT * FROM user WHERE email = ? `, email, function (err, data) {
    if (err) {
      throw err;
    }
    if (!data[0]) {
      return res.status("400").json({ email: "User Not Found!" });
    }
    // Check Password

    bcrypt.compare(password, data[0].password).then((isMatch) => {
      if (isMatch) {
        // User Matched
        const payload = { id: data[0].employeeID, name: data[0].first_name }; // Create JWT Payload
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route GET api/users/getUsers

router.get(
  "/getUsers",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    var sql = `SELECT first_name,last_name,employeeID,email,organizationName FROM user`;
    var serach_index = 0;

    if (req.query.search) {
      const objectArray = Object.entries(req.query.search);
      if (objectArray) {
        sql += " WHERE";
      }
      objectArray.forEach(([key, value]) => {
        if (serach_index > 0) {
          if (key == "employeeID") {
            sql += ` AND ${key} = ${value}`;
          } else {
            sql += ` AND ${key} LIKE "%${value}%"`;
          }
        } else {
          if (key == "employeeID") {
            sql += `  ${key} = ${value}`;
          } else {
            sql += ` ${key} LIKE "%${value}%"`;
          }
        }
        serach_index++;
      });
    }

    if (req.query.orderby && req.query.sort) {
      sql += ` ORDER BY ${req.query.sort} ${req.query.orderby}`;
    }
    if (req.query.limit && req.query.skip) {
      sql += ` LIMIT ${req.query.skip},${req.query.limit}`;
    }

    //console.log(sql);

    db.query(sql, function (err, data) {
      if (err) {
        throw err;
      }
      return res.status(200).json(data);
    });
  }
);

module.exports = router;
