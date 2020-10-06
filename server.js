const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const connectDB = require("./config/db");
const indexRoute = require("./routes/index");
const urlRoute = require("./routes/url");
const path = require("path");

require("dotenv").config({
  path: "config/config.env",
});

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });
}
app.use("/", indexRoute);
app.use("/api/url", urlRoute);
app.use((req, res, next) => {
  res.status(404).json({
    message: "Page Not Found",
    status: false,
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
