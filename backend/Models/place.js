const mongoose = require('mongoose');

const placeScheema = new mongoose.Schema({
    userId : { type : String, required : true },
    imageURL : { type : String, required : true },
    title : { type : String, required : true },
    description : { type : String, required : true },
    address : { type : String, required : true },
    coordinates : {
        lat : { type : Number, required : true },
        lng : { type : Number, required : true }
    } 
});

module.exports = mongoose.model('Place', placeScheema);

