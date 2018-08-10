"use strict";

const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

app.use(
  morgan(
    ":method :url :status Authorization: :req[authorization] Debug info: :res[x-debug] Redirect: :res[location]"
  )
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use(require("./routes"));

module.exports = {
  app: app
};
