const mongoose = require('mongoose');
const { Schema } = mongoose;

const productListSchema = new Schema({
  products:{
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('ProductList', productListSchema, 'products');