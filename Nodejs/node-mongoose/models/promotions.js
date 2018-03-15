// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Currency = require('mongoose-currency').loadType(mongoose);


var priceSchema = new Schema({
    price :{
        type: mongoose.Types.Currency
    }
});

// create a schema
var promotionSchema = new Schema({
    
    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: ''
    },
    price: [priceSchema],
    description: {
        type: String,
        required: true
    },
},
    {
  timestamps: true  
     
});

// the schema is useless so far
// we need to create a model using it
var Promotions = mongoose.model('Promotion', promotionSchema);

// make this available to our Node applications
module.exports = Promotions;