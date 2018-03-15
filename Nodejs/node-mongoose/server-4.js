var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Dishes.create({
        name: 'Uthapizza',
        image:'images/uthapizza.png',
        category: 'mains',
        label: 'Hot',
        price: [{price:4.99}],
        description: "A unique . . .",
        comments: [
            {
          rating: 5,
          comment: "Imagine all the eatables, living in conFusion!",
          author: "John Lemon"
        },
        {
          rating: 4,
          comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
          author: "Paul McVites"
        }
        ]
    }, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id;
        
        setTimeout( function(){
            Dishes.findById(id, {
                
            },{
                new:true
            })
            .exec(function(err, dish){
               if (err) throw err;
                    console.log('Dish Found!');
                    console.log(dish);
                
                dish.save(function (err, dish) {
                        console.log('Dish save on database!');
                        console.log(dish);

                        db.collection('dishes').drop(function () {
                            db.close();
                        });
                    });
            });
            
        },2000);
    });
});