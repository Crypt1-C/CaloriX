const Rating = require('../models/Rating');

// Add or update a rating
exports.rateRecipe = async (req, res) => {
  const { recipeId, recipeName, rating } = req.body;
  try {
    const existing = await Rating.findOne({ user: req.user.id, recipeId });
    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.status(200).json({ message: 'Rating updated', existing });
    }
    const newRating = new Rating({ user: req.user.id, recipeId, recipeName, rating });
    await newRating.save();
    res.status(201).json({ message: 'Recipe rated successfully', newRating });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get rating for a recipe
exports.getRecipeRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ recipeId: req.params.recipeId });
    const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length || 0;
    res.status(200).json({ ratings, average: avg.toFixed(1) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};