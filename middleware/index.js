var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all the middleware goes here
var middlewareObj = {};

// middleware to check ownership of a Campground
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    // is user logged in?
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                req.flash("error", "Campground not found!")
                res.redirect("back");
            } else {
                // does user hown the campground?
                if (foundCampground.author.id.equals(req.user.id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!")
        res.redirect("back")
    }
}

// middleware to check ownership of a Comment
middlewareObj.checkCommentOwnership = function (req, res, next) {
    // is user logged in?
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                // does user hown the comment?
                if (foundComment.author.id.equals(req.user.id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!")
        res.redirect("back")
    }
}

// middleware to prevent a user to add a comment if not logged in
middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj