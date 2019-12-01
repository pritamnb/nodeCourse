const mongoose = require('mongoose');
const genres = require('./routes/genres');
const express = require('express');
const app = express();
const Customers = require('./routes/customer');
mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/genres', genres);
app.use('/api/customers', Customers)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));