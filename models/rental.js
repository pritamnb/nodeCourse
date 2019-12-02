const Joi = require('joi');
const mongoose = require('mongoose');
const {Movie} = require('../models/movies'); 
const {Customer} = require('../models/customer');

const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: { 
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }      
    }),  
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
      }   
    }),
    required: true
  },
  dateOut: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  dateReturned: { 
    type: Date
  },
  rentalFee: { 
    type: Number, 
    min: 0
  }
}));


async function addRent(customerId,movieId) {
  const customer = await Customer.findById(customerId);
  if (!customer) console.log('Invalid customer.');
  
  console.log('customer details', customer);
  
  const movie = await Movie.findById(movieId);
  if (!movie) console.log('Invalid Movie');
  
  console.log('Movie details', movie);
  
  
  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  rental = await rental.save();

  if(rental) movie.numberInStock--;
  
  movie.save();
}
// addRent('5de2b8cef89fcd2ebc373472','5de4fe8825ddc71498a3e7bd');
function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental; 
exports.validate = validateRental;