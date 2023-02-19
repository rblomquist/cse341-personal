const router = require("express").Router();
const passport = require("passport");


router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.use("/google/auth/callback", passport.authenticate("google", { failureRedirect: "/"} ),
    (req, res) => {
        res.redirect("/")
    }
)

module.exports = router;