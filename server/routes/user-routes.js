const router = require('express').Router();
const passport = require("passport");


/* Authentication Routes */

//gets user info
router.get("/user", (req, res) => {
  //When the logIn() operation completed / once authenticated, user obj will be store in req.user.
  res.send(req.user);
});

//login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Found");
    else {
      //Passport exposes a logIn() function on req

      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Authentication Successful");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

//logout
router.get('/logout', (req, res, next) => {
	//handle with passport
	res.send('login out');
})
//registration
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exist");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User created");
    }
  });
});

module.exports = router;