module.exports = {
  EXPECTED_CLIENT_ID: process.env.EXPECTED_CLIENT_ID || "dummy-client-id",
  EXPECTED_CLIENT_SECRET:
    process.env.EXPECTED_CLIENT_SECRET || "dummy-client-secret",
  AUTH_REQUEST_PATH: process.env.AUTH_REQUEST_PATH || "/o/oauth2/v2/auth",
  ACCESS_TOKEN_REQUEST_PATH:
    process.env.ACCESS_TOKEN_REQUEST_PATH || "/o/oauth2/token",
  USERINFO_REQUEST_URL:
    process.env.USERINFO_REQUEST_URL || "/oauth2/v3/userinfo",
  TOKENINFO_REQUEST_URL:
    process.env.TOKENINFO_REQUEST_URL || "/oauth2/v3/tokeninfo",
  PERMITTED_REDIRECT_URLS: process.env.PERMITTED_REDIRECT_URLS
    ? process.env.PERMITTED_REDIRECT_URLS.split(",")
    : ["http://localhost:8080/login/oauth2/code/google"],
  PERMITTED_REDIRECT_HARVEST_URLS: process.env.PERMITTED_REDIRECT_HARVEST_URLS
    ? process.env.PERMITTED_REDIRECT_HARVEST_URLS.split(",")
    : ["http://localhost:8080/api/time/users/me"],
  AUTH_REQUEST_PATH_HARVEST:
    process.env.AUTH_REQUEST_PATH_HARVEST || "/o/oauth2/v2/harvestauth"
};
