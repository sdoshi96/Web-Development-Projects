var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Promotions.create({
        name: "Weekend Grand Buffet",
      image: "images/buffet.png",
      label: "New",
      price: [{price:19.99}],
      description: "Featuring . . ."
    }, function (err, promotion) {
        if (err) throw err;
        console.log('Promotion created!');
        console.log(promotion);

        var id = promotion._id;
        
        setTimeout( function(){
            Promotions.findById(id, {
                
            },{
                new:true
            })
            .exec(function(err, promotion){
               if (err) throw err;
                    console.log('Promotion Found!');
                    console.log(promotion);
                
                dish.save(function (err, promotion) {
                        console.log('Promotion save on database!');
                        console.log(promotion);

                        db.collection('promotions').drop(function () {
                            db.close();
                        });
                    });
            });
            
        },2000);

    });
});