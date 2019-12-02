const {Rental, validate} = require('../models/rental'); 
const {Movie} = require('../models/movies'); 
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();


Fawn.init(mongoose);

router.get('/', async (req, res) => {
  // console.log(req.body);
  
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  // if(!mongoose.Types.ObjectId.isValid(req.body.customerId))
  //   return res.status(400).send(error.details[0].message);
  // To overcome the above extra validation type we simply install :joi-objectid
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');


  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');
  
  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

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
  // rental = await rental.save();

  // movie.numberInStock--;
  // movie.save();
  try {
   new Fawn.Task()
  .save('rentals', rental)
  .update('movies', {_id: movie._id},
  {
    $inc: {numberInStock: -1}
  })
  .run();
  res.send(rental);
} catch(e){
  res.status(500).send('something went wrong..!');
}
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router;