const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const studentAPI = require("./server/routes/studentAPI");
const adminAPI = require("./server/routes/adminAPI");
const authAPI = require("./server/routes/authAPI");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/finalProjectDB', { useNewUrlParser: true })
//might need useUnifiedTopology: true

app.use(cookieParser())
app.use(cors())
// app.use(cors({
//   credentials: true,
//   origin: ['https://elevation-job-manager.herokuapp.com']
// })) //  // origin: ['https://elevation-job-manager.herokuapp.com/'] (WAS AFTER CREDENTIALS)


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});
app.use(express.static(path.join(__dirname, 'build')));
// app.use('/static', express.static(path.join(__dirname, 'client/build')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/student", studentAPI);
app.use("/admin", adminAPI);
app.use("/auth", authAPI);


const port = 8888;

//HEROKU
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || port, function () {
  console.log(`Running server on port ${port}`);
});
