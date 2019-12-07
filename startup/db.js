const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const winston = require('winston');

module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => winston.info('Connected to MongoDB'))

}