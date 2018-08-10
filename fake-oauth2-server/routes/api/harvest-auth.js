var router = require("express").Router();
const utils = require("../utils");
const config = require("../../config");

const company = require("../../mockups/company");
const usersData = require("../../mockups/users");
const userMe = require("../../mockups/userMe");
const time = require("../../mockups/time");

router.get(config.AUTH_REQUEST_PATH_HARVEST, authHarvestRequestHandler);

router.get("/company", (req, res) => {
  res.status(200);
  res.send(company);
  res.end();
});

router.get("/time_entries", (req, res) => {
  res.status(200);
  res.send(time);
  res.end();
});

router.get("/users/me", (req, res) => {
  res.status(200);
  userMe.id = req.params.id;
  userMe.userid = req.params.id;
  res.send(userMe);
  res.end();
});

router.get("/users", (req, res) => {
  res.status(200);
  res.send(usersData);
  res.end();
});

router.get("/users/:id", (req, res) => {
  res.status(200);
  let user = getUser(req.params.id);

  user.id = req.params.id;
  user.userid = req.params.id;
  res.send(user);
  res.end();
});

router.get("/harvest", (req, res) => {
  res.status(200);
  res.send({ harvest: true });
  res.end();
});

function getUser(id) {
  if (typeof id == "undefined") {
    return usersData.users;
  }

  for (var i in usersData.users) {
    if (usersData.users[i].id == id) {
      return usersData.users[i];
    }
  }
}

function authHarvestRequestHandler(req, res) {
  if (
    utils.validateAuthRequest(req, res, config.PERMITTED_REDIRECT_HARVEST_URLS)
  ) {
    utils.sendAuthResponse(req, res);
  } else {
    console.log("false");
  }
  res.end();
}

module.exports = router;
