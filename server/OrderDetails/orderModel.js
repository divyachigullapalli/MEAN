var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  id: Number,
  emailId: String,
  Status: Boolean,
  items: [{
    id: Number,
    name: String,
    imgUrl: String,
    quantity: Number,
    price: Number,
    total: Number,
  }]

});

module.exports = mongoose.model('orders', OrderSchema);