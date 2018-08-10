var router = require("express").Router();
const randomstring = require("randomstring");

const config = require("../../config");
const utils = require("../utils");

const code2token = {};
const authHeader2personData = {};
const id_token2personData = {};

router.get(config.AUTH_REQUEST_PATH, authRequestHandler);

router.get("/login-as", (req, res) => {
  const code = createToken(
    req.query.name,
    req.query.email,
    req.query.expires_in,
    req.session.client_state
  );
  var location = req.session.redirect_uri + "?code=" + code;
  if (req.session.client_state) {
    location += "&state=" + req.session.client_state;
  }
  res.writeHead(307, { Location: location });
  res.end();
});

router.post(config.ACCESS_TOKEN_REQUEST_PATH, (req, res) => {
  if (validateAccessTokenRequest(req, res)) {
    const code = req.body.code;
    const token = code2token[code];
    if (token !== undefined) {
      console.log("access token response body: ", token);
      res.send(token);
    }
  }
  res.end();
});

router.get(config.TOKENINFO_REQUEST_URL, (req, res) => {
  if (req.query.id_token == null) {
    res.status(400);
    res.send("missing id_token query parameter");
  }
  const token_info = id_token2personData[req.query.id_token];
  if (token_info !== undefined) {
    res.status(200);
    res.send(token_info);
  } else {
    res.status(404);
    res.send("token not found by id_token " + req.query.id_token);
  }
  res.end();
});

router.get(config.USERINFO_REQUEST_URL, (req, res) => {
  const token_info = authHeader2personData[req.headers["authorization"]];
  if (token_info !== undefined) {
    console.log("userinfo response", token_info);
    res.send(token_info);
  } else {
    res.status(404);
  }
  res.end();
});

function validateAccessTokenRequest(req, res) {
  let success = true,
    msg;
  if (req.body.grant_type !== "authorization_code") {
    success = false;
    msg = errorMsg("grant_type", "authorization_code", req.body.grant_type);
  }
  if (!success) {
    const params = {};
    if (msg) {
      params["X-Debug"] = msg;
    }
    res.writeHead(401, params);
  }
  return success;
}

function createToken(name, email, expires_in, client_state) {
  const code = "C-" + randomstring.generate(3);
  const accesstoken = "ACCT-" + randomstring.generate(6);
  const refreshtoken = "REFT-" + randomstring.generate(6);
  const id_token = "IDT-" + randomstring.generate(6);
  const token = {
    access_token: accesstoken,
    expires_in: expires_in,
    refresh_token: refreshtoken,
    id_token: id_token,
    state: client_state,
    token_type: "Bearer"
  };
  id_token2personData[id_token] = authHeader2personData[
    "Bearer " + accesstoken
  ] = {
    email: email,
    name: name,
    isHarvestTokenAvailable: false,
    at_hash: "VMXtNNJ8Tt9QjyGescfKbg",
    sub: "105378803156739379220",
    email_verified: true,
    iss: "https://accounts.google.com",
    given_name: "Vladan",
    locale: "en",
    picture:
      "https://lh4.googleusercontent.com/-nSmkctgXbNI/AAAAAAAAAAI/AAAAAAAAAA4/YlaZ_RZQ4wY/s96-c/photo.jpg",
    aud: [
      "751535165727-7mhp9sv0upqk8f2482r51t2gql1i59tv.apps.googleusercontent.com"
    ],
    azp:
      "751535165727-7mhp9sv0upqk8f2482r51t2gql1i59tv.apps.googleusercontent.com",
    hd: "3ap.ch",
    exp: "Apr 16, 2018, 5:16:04 PM",
    family_name: "Djordjevic",
    iat: "Apr 16, 2018, 4:16:04 PM"
  };
  code2token[code] = token;
  return code;
}

function authRequestHandler(req, res) {
  if (utils.validateAuthRequest(req, res, config.PERMITTED_REDIRECT_URLS)) {
    utils.sendAuthResponse(req, res);
  } else {
    console.log("false");
  }
  res.end();
}

module.exports = router;
