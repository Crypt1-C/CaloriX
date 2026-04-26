const Favorite = require('../models/Favorite');

// POST /api/favorites — Save a recipe
exports.saveFavorite = async (req, res) => {
  try {
    const { mealId, mealName, mealImage } = req.body;
    const userId = req.user.id; // comes from JWT token

    // Check if already saved
    const existing = await Favorite.findOne({ userId, mealId });
    if (existing) {
      return res.status(400).json({ message: 'Recipe already in favorites' });
    }

    const favorite = new Favorite({ userId, mealId, mealName, mealImage });
    await favorite.save();

    res.status(201).json({ message: 'Recipe saved to favorites', favorite });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/favorites — Get all favorites
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await Favorite.find({ userId });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/favorites/:id — Remove a favorite
exports.deleteFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findByIdAndDelete(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json({ message: 'Recipe removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};