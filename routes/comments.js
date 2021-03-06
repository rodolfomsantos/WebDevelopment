var express = require("express");
// the mergeParams is so that we still get the :id even refactoring the route
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comments new
// we will also include the middleware so that the user cannot add
// a comment if not logged in with isLoggedIn
router.get("/new", middleware.isLoggedIn, function (req, res) {
    // find campground by ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });

});

// comments create
// we will also include the middleware so that the user cannot add
// a comment if not logged in with isLoggedIn
router.post("/", middleware.isLoggedIn, function (req, res) {
    // lookup campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong!")
                    console.log(err);
                } else {
                    // add username and ID to the comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    // redirect to campground show page
                    req.flash("success", "Successfully added comment!")
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
});

// comments edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership,function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment })
        }
    });

});

// comments update
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// comments destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    // findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;