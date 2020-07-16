var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user")

//we had to intall dotenv so that we can use these files 
//we have to require dotenv so that we can use .env file to store hte DB pass
/* require('dotenv').config() */

// requiring Routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

// defining the DB pass variable
// wee could have also have encoded the username in the .env file
/* const DB_PASS = process.env.DB_PASS; */


// we have to define this constante in order that this functions after in heroku
const PORT = process.env.PORT || 3000;

// local database.
// we have to switch between databases so that we dont't contaminate the porduction app
// for this we have to comment the one we don't want to use at the moment.
// it is better only to launch the app to Atlas after testing with the local database
//so that we are not alway switching databases we will export the URL
// of each database usin "export (name in ALLcaps that we want to give):(url of the local databese)
// so that then we just call that name
mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// we have to add the useNewUrlParser and the useUnifiedTopology 
//as true so that we don't have a depreciation error
// bellow is the production database in Atlas. If We want only to use the local database in local we have to use the one above
// in order not to switch the databse in porduction we need to set the variable 
// in the heroku system in settings using the same name given for the local but wit the url of Atlas
// we do this using int command line heroku config: set (name given)=Atlas URL
// so after this we can now comment the connection to Atlas
// and like this we no longer need to use the .env method used earlier!!!
//ATENTION: IF WE USE THE SYSTEM VARIABLES IN HEROKU WE HAVE TO HARDCODE THE PASSWORD IN THE URL
/* mongoose.connect("mongodb+srv://dbWebdeveloper:"+DB_PASS+"@cluster0-5k8o8.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) */
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