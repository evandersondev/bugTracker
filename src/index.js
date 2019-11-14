const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use("/", require("./routes"));

// public dir config
app.use(express.static(path.join(__dirname, "/public")));

// engine config
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

const PORT = 8080;

app.listen(PORT, err => {
  if (err) {
    return console.log(err);
  } else {
    return console.log(`Server is runnig on port ${PORT}`);
  }
});
