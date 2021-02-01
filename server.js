const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8081;


const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const url = "mongodb://localhost:27017/3weeks";

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const cors = require("cors");

const filmRoutes = require("./app/routes/film.route");

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log("Error: ", error);
  });

app.use(cors());

app.use("/api/film", filmRoutes);


app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});