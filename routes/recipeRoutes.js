const express = require('express');
const router = express.Router();
const {
  searchRecipes,
  searchByIngredient,
  getAllRecipes,
  getRecipeById
} = require('../controllers/recipeController');

router.get('/',                getAllRecipes);       // 1.3
router.get('/search',          searchRecipes);       // 1.1
router.get('/by-ingredient',   searchByIngredient);  // 1.2
router.get('/:id',             getRecipeById);       // 1.4

module.exports = router;