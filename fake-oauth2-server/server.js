var https = require("https");
const fs = require("mz/fs");
const PORT = process.env.PORT || 8282;
const app = require("./app");
const config = require("./config");

var options = {
  key: fs.readFileSync("./cert/selfsigned.key", "utf8"),
  cert: fs.readFileSync("./cert/selfsigned.crt", "utf8")
};

console.log(options);

console.log("Running on http://localhost:" + PORT);
console.log("\texpected Client ID: " + config.EXPECTED_CLIENT_ID);
console.log("\texpected Client Secret: " + config.EXPECTED_CLIENT_SECRET);
console.log("\tauthorization endpoint: " + config.AUTH_REQUEST_PATH);
console.log("\taccess token endpoint: " + config.ACCESS_TOKEN_REQUEST_PATH);
console.log("\tredirect URLs: " + config.PERMITTED_REDIRECT_HARVEST_URLS);

https
  .createServer(options, function(req, res) {
    app.app.handle(req, res);
  })
  .listen(PORT);
