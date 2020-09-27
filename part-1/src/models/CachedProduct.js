const mongoose = require('mongoose');
const { Schema } = mongoose;

const cachedProductSchema = new Schema({
  productInfo: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
    expires: 600
  }
});

module.exports = mongoose.model('cachedProducts', cachedProductSchema, 'cachedProducts');