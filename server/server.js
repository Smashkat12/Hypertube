const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("./user");

/* ****************************************************END OF IMPORTS **************************************************** */

//DB connection
mongoose.connect(
  "mongodb+srv://Hypertube:Hypertube@cluster0.1mxy5.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose is running");
  }
);

/* ****************************************************END OF DB CONNECTION **************************************************** */

//Variables
const app = express();
const PORT = 5000;

/* Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ externa: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <---- front end react app
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretsource",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretsource"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport); //pass same instance of passport to be used in config.

/* ****************************************************END OF MIDDLEWARE **************************************************** */

/* Routes */

app.get("/user", (req, res) => {
  //When the logIn() operation completed / once authenticated, user obj will be store in req.user.
  res.send(req.user);
});

app.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.send('No User Found');
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

app.post("/register", (req, res) => {
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

/* ****************************************************END OF ROUTES **************************************************** */

/* Start server */
app.listen(PORT, () => {
  console.log(`back-end server listening on port ${PORT}`);
});
