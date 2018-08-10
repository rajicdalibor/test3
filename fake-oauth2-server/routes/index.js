var router = require("express").Router();

router.use("/", require("./api/harvest-auth"));
router.use("/", require("./api/google-auth"));

module.exports = router;
