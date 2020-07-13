var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX route - show all campgrounds
router.get("/", function (req, res) {
    // get all campgrounds from the db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            // and then send them to the camgrounds .ejs file
            res.render("campgrounds/index", { campgrounds: allCampgrounds })
        }
    });
});

// CREATE route - add new campground to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
    // get data from form and add it to the  array, and yo have to install body-parser
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { name: name, price: price, image: image, description: desc, author: author };
    // Create a new campground and save it in the DB
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

// NEW route - show form to create new campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new")
});

// SHOW route - shows more information of a given campground on the DB
router.get("/:id", function (req, res) {
    // find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            // render the show template with that new found campground
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

// Edit Campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

// Update Campground route
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    // find and update the correct Campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            // redirect somewhere (show page)
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Destroy (delete) Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;