const Joi = require('joi');
const mongoose = require('mongoose');
 const Customer =  mongoose.model('Customer', new mongoose.Schema({
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
    maxlength: 10
  }
}));

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}
// without insertion, it won't be able to see the collection
async function insertCustomer() {
  const customer = new Customer({
    name : 'Pritam',
    isGold: true,
    phone: "9284261375"
  });
  const result = await customer.save();
  console.log('**********',result);
  
}
// insertCustomer();
exports.Customer = Customer; 
exports.validate = validateCustomer;