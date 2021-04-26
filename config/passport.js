const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");
const db = require("./db");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      db.query(
        `SELECT *  FROM user WHERE employeeID = ? `,
        jwt_payload.id,
        function (err, user) {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        }
      );
    })
  );
};
