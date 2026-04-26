const express = require('express');
const router = express.Router();
const { rateRecipe, getRecipeRatings } = require('../controllers/ratingController');
const protect = require('../middleware/authMiddleware_login');

router.post('/', protect, rateRecipe);
router.get('/:recipeId', getRecipeRatings);

module.exports = router;