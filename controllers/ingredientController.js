const Ingredient = require('../models/Ingredient');

// Save ingredient
const addIngredient = async (req, res) => {
  const { name, calories, protein, carbs, fat } = req.body;
  try {
    const trimmedName = (name || '').toString().trim();
    if (!trimmedName) {
      return res.status(400).json({ message: 'Ingredient name is required' });
    }

    const ingredient = new Ingredient({
      user: req.user.id,
      name: trimmedName,
      calories: typeof calories === 'number' ? calories : Number(calories) || 0,
      protein,
      carbs,
      fat,
    });
    await ingredient.save();
    res.status(201).json({ message: 'Ingredient saved', ingredient });
  } catch (error) {
    // Surface validation errors as 400 (helps frontend UX)
    if (error?.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's ingredients
const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({ user: req.user.id });
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete ingredient
const deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) return res.status(404).json({ message: 'Ingredient not found' });

    if (ingredient.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    await ingredient.deleteOne();
    res.status(200).json({ message: 'Ingredient deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { addIngredient, getIngredients, deleteIngredient };