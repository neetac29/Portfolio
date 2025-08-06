const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  experience: {
    type: String,
    required: true,  
    trim: true       
  }
}, {
  timestamps: true    
});

module.exports = mongoose.model('Experience', experienceSchema); 
