const _ = require("underscore");
const fs = require("fs");
const config = require("../config");
const ui = _.template(fs.readFileSync("./input.html").toString());

function sendAuthResponse(req, res) {
  req.session.redirect_uri = req.query.redirect_uri;
  if (req.query.state) {
    req.session.client_state = req.query.state;
  }
  res.send(
    ui({
      query: req.query
    })
  );
}

function validateAuthRequest(req, res, urls) {
  const actualClientId = req.query.client_id;
  if (validateClientId(actualClientId, res)) {
    if (req.query.response_type !== "code") {
      res.writeHead(401, {
        "X-Debug": errorMsg("response_type", "code", req.query.response_type)
      });
      return false;
    }
    if (req.query.redirect_uri && !_.contains(urls, req.query.redirect_uri)) {
      res.writeHead(401, {
        "X-Debug": errorMsg(
          "redirect_uri",
          "one of " + permittedRedirectURLs(),
          req.query.redirect_uri
        )
      });
      return false;
    }
    return true;
  }
  return false;
}

function validateClientId(actualClientId, res) {
  if (actualClientId === config.EXPECTED_CLIENT_ID) {
    return true;
  }
  res.writeHead(400, {
    "X-Debug": errorMsg("client_id", config.EXPECTED_CLIENT_ID, actualClientId)
  });
  res.end();
  return false;
}

function permittedRedirectURLs() {
  return _.reduce(
    config.PERMITTED_REDIRECT_URLS,
    (a, b) => (a === "" ? b : a + ", " + b),
    ""
  );
}

function errorMsg(descr, expected, actual) {
  return "expected " + descr + ": " + expected + ", actual: " + actual;
}

module.exports = {
  validateAuthRequest: validateAuthRequest,
  sendAuthResponse: sendAuthResponse
};
