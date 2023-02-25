const router = require("express").Router();
const tyranids = require("./tyranids");
const wolves = require("./wolves");



router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "logged in" : "Logged out");
  });


router.use("/tyranids", tyranids);
router.use("/wolves", wolves);

module.exports = router;