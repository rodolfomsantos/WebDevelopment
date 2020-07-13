var mongoose = require("mongoose");

// now we will setup the SCHEMA of our database
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author:{
        id:{
            type:mongoose.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});
// now we have to compile the SCHEMA into a mongose model
module.exports = mongoose.model("Campground", campgroundSchema);