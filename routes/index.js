const router = require("express").Router();
const tyranids = require("./tyranids");
const wolves = require("./wolves");
// const auth = require("./auth");


router.get('/', (req, res) => {
    // res.send('Home Page');
    res.send(req.oidc.isAuthenticated() ? "logged in" : "Logged out");
  });


router.use("/tyranids", (req, res) => {
    req.oidc.isAuthenticated() ? tyranids : res.redirect('/') });
router.use("/wolves", wolves);
// router.use("/auth", auth);

module.exports = router;