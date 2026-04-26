const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number },
  carbs: { type: Number },
  fat: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Ingredient', ingredientSchema);