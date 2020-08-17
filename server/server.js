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
const userRouter = require('./routes/user-routes');

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
app.use('/users', userRouter);
require("./passportConfig")(passport); //pass same instance of passport to be used in config.

/* ****************************************************END OF MIDDLEWARE **************************************************** */


/* Start server */
app.listen(PORT, () => {
  console.log(`back-end server listening on port ${PORT}`);
});
