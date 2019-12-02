const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genres');
const {Genre} = require('../models/genres');

const Movie = mongoose.model('movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength:2,
        maxlength:255
    },
    genre:{type:genreSchema,required:true},
    numberInStock:{
        type:Number,
        required: true,
        min:0,
        max:255
    },
    dailyRentalRate: {
        type:Number,
        required: true,
        min:0,
        max:255
    }
}));
async function addMovie(genreId){
    const genre = await Genre.findById(genreId);
    if(!genre) return console.log('...Invalid Genre...');
    const movie = new Movie({
        title: 'Get Out',
        genre: {_id:genreId,name:genre.name},
        numberInStock: 0,
        dailyRentalRate:0
    });
    const result = await movie.save();
    console.log('*********', result);
    
}
// addMovie('5de25a42c60a882a80e4f2cb'); // ref id of a genre(thriller)
function validateMovie(movie) {
    const schema = {
      title: Joi.string().min(2).max(50).required(),
      genreId: Joi.string().required(),
      numberInStock: Joi.number().min(0).required(),
      dailyRentalRate: Joi.number().min(0).required()
    };
  
    return Joi.validate(movie, schema);
  }
  exports.Movie = Movie;
  exports.validate = validateMovie;