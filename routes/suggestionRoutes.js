const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware_login');
const { getSuggestions } = require('../controllers/suggestionController');

// GET /api/suggestions — suggestions based on saved ingredients (protected)
router.get('/', protect, getSuggestions);

module.exports = router;

