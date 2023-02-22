const router = require("express").Router();
const tyranids = require("./tyranids");
const wolves = require("./wolves");
const { requiresAuth } = require('express-openid-connect');



router.get('/', (req, res) => {
    // res.send('Home Page');
    res.send(req.oidc.isAuthenticated() ? "logged in" : "Logged out");
  });


router.use("/tyranids", requiresAuth(), tyranids);
router.use("/wolves", wolves);
// router.use("/auth", auth);

module.exports = router;