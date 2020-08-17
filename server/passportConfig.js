const User = require("./user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ email: username }, (err, user) => {
        if (err) throw err;
        if (!user)
          return done(null, false); /* done with no error and no user */
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result == true) {
            return done(null, user); /* return with no error and a user */
          } else {
            return done(null, false); /* password dont match*/
          }
        });
      });
    })
  );

  /* stores cookie inside browser */

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  /* takes cookier and gets user */

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      cb(err, user);
    });
  });
};
