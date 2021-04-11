require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const path = __dirname + '/app/views/';
const app = express();
app.use(express.static(path));

// ===============================
// express config
// ===============================
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// ===============================
// database
// ===============================
const db = require("./app/models");

// production
db.sequelize.sync();

// development
// db.sequelize.sync({ force: true }).then(() => {
//    console.log("Drop and re-sync db.");
// });


// ===============================
// routes
// ===============================
// simple route test
app.get("/hello", (req, res) => {
  console.log("We're alive");
  // res.sendFile(path + "index.html");
  res.json({ message: "Welcome to bezkoder application." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/tutorial.routes")(app);


// ===============================
// main() ...
// set port, listen for requests
// ===============================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
