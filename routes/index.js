const router = require("express").Router();
const tyranids = require("./tyranids");
const wolves = require("./wolves");
// const auth = require("./auth");


router.get('/', (req, res) => {
    // res.send('Home Page');
    res.send(req.oidc.isAuthenticated() ? "logged in" : "Logged out");
    console.log(req.body);
  });


router.use("/tyranids", tyranids);
router.use("/wolves", wolves);
// router.use("/auth", auth);

module.exports = router;