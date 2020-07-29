//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");

//EXPRESS server
const app = express()
const port = process.env.PORT || 5000

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(passport.initialize())
require('./config/passport')(passport)

app.use(express.json())
app.use("/api/users", users);

//starting mongodb server here
const db = require("./config/keys").mongoURI;
mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.listen(port, () => {
    console.log('Server is running on port: '+port);
});
