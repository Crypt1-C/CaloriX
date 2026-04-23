const express = require('express');
const router = express.Router();
const {
  saveFavorite,
  getFavorites,
  deleteFavorite
} = require('../controllers/favoriteController');

const authMiddleware = require('../middleware/authMiddleware_login');

// All routes are protected — user must be logged in
router.post('/',      authMiddleware, saveFavorite);    // Save a recipe
router.get('/',       authMiddleware, getFavorites);    // Get all favorites
router.delete('/:id', authMiddleware, deleteFavorite); // Remove a favorite

module.exports = router;