const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongodb = require("./db/connect");
const dotenv = require("dotenv");


module.exports = function(passport) {
    passport.use(new GoogleStrategy ({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
        console.log(profile)
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        mongodb.getDb().db().find({ _id: id })
    })
}