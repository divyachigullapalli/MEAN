var mongoose = require('mongoose');

var ListSchema = new mongoose.Schema({
  id: Number,
  name: String,
  imgUrl: String,
  price: Number

});

module.exports = mongoose.model('List', ListSchema);