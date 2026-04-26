const axios = require('axios');
const Ingredient = require('../models/Ingredient');

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

exports.getSuggestions = async (req, res) => {
  try {
    // Get user's saved ingredients
    const ingredients = await Ingredient.find({ user: req.user.id });
    
    if (ingredients.length === 0) {
      return res.status(200).json({ message: 'No ingredients found', suggestions: [] });
    }

    // Search recipes for each ingredient
    const suggestions = [];
    for (const ingredient of ingredients) {
      const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredient.name}`);
      if (response.data.meals) {
        suggestions.push(...response.data.meals);
      }
    }

    // Remove duplicates
    const unique = suggestions.filter(
      (meal, index, self) => index === self.findIndex(m => m.idMeal === meal.idMeal)
    );

    res.status(200).json(unique);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};