const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  mealId:   { type: String, required: true },  // ID from TheMealDB
  mealName: { type: String, required: true },
  mealImage:{ type: String },
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);