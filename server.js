const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

require("./config/passport")(passport);

const users = require("./routes/api/users");

const app = express();

//body parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use("/api/users", users);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is Running on ${port}`));
