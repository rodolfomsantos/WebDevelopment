var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Homepage - root route
router.get("/", function (req, res) {
    res.render("landing")
});

// show the register form
router.get("/register", function (req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            res.redirect("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

// show login form
router.get("/login", function (req, res,) {
    res.render("login");
});
// handling login logic
// we will use a middleware
// app.post("/login", middleware, callback)
router.post("/login", function (req, res, next) {
    passport.authenticate("local",
      {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        // to show the login error flash message
        failureFlash: true,
        // to show the success flash message
        successFlash: "Welcome to YelpCamp, " + req.body.username + "!"
      })(req, res);
  });
  

// logout route logic
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/campgrounds");
});

module.exports = router;