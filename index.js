const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const Customers = require('./routes/customer');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const app = express();
mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/genres', genres);
app.use('/api/customers', Customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));