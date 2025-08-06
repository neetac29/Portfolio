const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  product_id: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: mongoose.Schema.Types.Mixed, 
    required: false
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Project', projectSchema); 
