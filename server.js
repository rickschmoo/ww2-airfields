require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

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
app.get("/", (req, res) => {
  console.log("We're alive");
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/tutorial.routes")(app);


// ===============================
// main() ...
// set port, listen for requests
// ===============================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
