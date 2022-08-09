const express = require("express");
const path = require("path");
const cors = require("cors");
var mysql = require('mysql');
require('dotenv').config();

const userController = require("./controllers/userController.js");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// var con = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME,
//   user: process.env.RDS_USERNAME,
//   password: process.env.RDS_PASSWORD
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


if(process.env.NODE_ENV === 'production'){
  app.use("/build", express.static(path.join(__dirname, "../build")));
  app.get("/*", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "../build/index.html"));
  });

}
else{
  app.get("/", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "../client//views/index.html"));
  });
}

//CREATE USER
app.post("/createUser", userController.createUser, (req, res) => {
  res.send('Hello World!');
});


app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.log('Error: ', err);
  res.status(500).send("Internal Server Error");
});

app.listen(3000, () => {
  console.log('Server listening on port: 3000');
});

module.exports = app;