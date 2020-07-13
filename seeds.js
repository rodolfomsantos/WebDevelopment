var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

// sample data
var data = [
    {
        name: "Cloud's Rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTn430Gcws9QMkvXuNhrPDAwO-f-ij8CWaSg&usqp=CAU",
        description: "Bacon ipsum dolor amet cow sirloin turducken t-bone meatball doner porchetta salami spare ribs boudin buffalo. Capicola shoulder ham hock meatloaf swine tenderloin leberkas biltong brisket. Tenderloin kielbasa pig strip steak bresaola salami beef rump boudin shoulder tongue jerky meatloaf meatball burgdoggen. Landjaeger pork belly sausage spare ribs biltong. Pig ham ground round bacon, alcatra sirloin turkey tail cupim salami pastrami kevin pancetta landjaeger. Beef ground round turducken filet mignon, ham chicken pork belly shankle."
    },
    {
        name: "Desert Mesa",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQj0C9jxi5pT_-PLNSAiRB-fa8tpYNMfV3dtQ&usqp=CAU",
        description: "Bacon ipsum dolor amet cow sirloin turducken t-bone meatball doner porchetta salami spare ribs boudin buffalo. Capicola shoulder ham hock meatloaf swine tenderloin leberkas biltong brisket. Tenderloin kielbasa pig strip steak bresaola salami beef rump boudin shoulder tongue jerky meatloaf meatball burgdoggen. Landjaeger pork belly sausage spare ribs biltong. Pig ham ground round bacon, alcatra sirloin turkey tail cupim salami pastrami kevin pancetta landjaeger. Beef ground round turducken filet mignon, ham chicken pork belly shankle."
    },
    {
        name: "Canyon Floor",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRNOR-M8QQRVHaSllxmC31CkZ8o5HseCa5TKQ&usqp=CAU",
        description: "Bacon ipsum dolor amet cow sirloin turducken t-bone meatball doner porchetta salami spare ribs boudin buffalo. Capicola shoulder ham hock meatloaf swine tenderloin leberkas biltong brisket. Tenderloin kielbasa pig strip steak bresaola salami beef rump boudin shoulder tongue jerky meatloaf meatball burgdoggen. Landjaeger pork belly sausage spare ribs biltong. Pig ham ground round bacon, alcatra sirloin turkey tail cupim salami pastrami kevin pancetta landjaeger. Beef ground round turducken filet mignon, ham chicken pork belly shankle."
    }
]

function seedDB() {
    // remove all campgrounds
    Campground.deleteMany({}, function (err) {
        /* if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        // add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    // add a few comments
                    Comment.create({
                        text: "This place is great, but I wish there was internet!!",
                        author: "Homer"
                    }, function (err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("New comment created!!")
                        }
                    });
                }
            });
        }); */
    });
}

module.exports = seedDB;

