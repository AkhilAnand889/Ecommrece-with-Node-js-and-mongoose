const express = require("express");
var cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
require("dotenv").config({ path: "./config/.env" });

const useRouter = require("./routes/router");

const app = express();

//app uses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", useRouter);
mongoose.connect("mongodb://127.0.0.1:27017/").then(()=> console.log('successfully connected database')).catch( (err) => console.log(err) );

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });

  const path = require("path");

  app.use(
    "/static",
    express.static(path.join(__dirname, "client", "build/static"))
  );

  app.use(
    "/manifest.json",
    express.static(path.join(__dirname, "client", "build", "manifest.json"))
  );

  app.use(
    "/favicon.ico",
    express.static(path.join(__dirname, "client", "build", "favicon.ico"))
  );

  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server is running at ${port}`));
