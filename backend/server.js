//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");

//EXPRESS server
const app = express()
const port = process.env.PORT || 5000

require('dotenv').config();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(passport.initialize())
require('./config/passport')(passport)

app.use(express.json())
app.use("/api/users", users);

const db = require("./config/keys").mongoURI;
mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.listen(port, () => {
    console.log('Server is running on port: '+port);
});
