const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware_login');
const { addIngredient, getIngredients, deleteIngredient } = require('../controllers/ingredientController');

router.post('/', protect, addIngredient); 
router.get('/', protect, getIngredients);
router.delete('/:id', protect, deleteIngredient);

module.exports = router;