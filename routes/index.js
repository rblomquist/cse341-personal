const router = require("express").Router();
const tyranids = require("./tyranids");
const wolves = require("./wolves");
// const auth = require("./auth");


router.get('/', (req, res) => {
    res.send('Home Page')
    // res.send(req.oidc.isAuthenticated() ? "logged in" : "Logged out");
  });
// router.get('/login', (req, res) =>
//   res.oidc.login({
//     returnTo: '/profile',
//     authorizationParams: {
//       redirect_uri: 'http://localhost:3000',
//     },
//   })
// );
router.get('/callback', (req, res, next) => {
  res.redirect("https://youtube.com");
  next()
})

router.use("/tyranids", tyranids);
router.use("/wolves", wolves);
// router.use("/auth", auth);

module.exports = router;