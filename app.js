var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user")

// requiring Routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

// we have to define this constante in order that this functions after in heroku
const PORT = process.env.PORT || 3000;

// we have to add the useNewUrlParser and the useUnifiedTopology 
//as true so that we don't have a depreciation error
mongoose.connect("mongodb://localhost/yelp_camp_v12", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    // and we use this to verify if we are connected to the database
    // or to see the error in case of problems
    .then(() => console.log("Connected to the database..."))
    .catch(
        err => console.log("Refuse to connect...", err)
    );

// we have to tell express to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// we will tell the app that we are usin .ejs files so taht we don't
// have to type the extention all the time
app.set("view engine", "ejs");

// conect to the main.css file
app.use(express.static(__dirname + "/public"));

// using method-override
app.use(methodOverride("_method"));

// using connect-flash
app.use(flash());

//we will run seeds everytime the server runs to see if we have the db running correctly
//seedDb();

// configuring passport
app.use(require("express-session")({
    // for the secret we can use warever we want
    secret: "Eu adoro as minhas meninas!!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// configurating the currentUser so that it is used through out all the app
// with this we will use the following midleware
// we will also pass the message for flash to error and success messages
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// using the routes files
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// start the server
// we have to use this method if we want to delpy the app on heroku
app.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost:${PORT}`);
  });