const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(
  cors({
    origin: (origin, cb) => {
      const raw = process.env.CLIENT_ORIGIN || '';
      const allowed = raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      // allow same-origin / server-to-server / tools (no Origin header)
      if (!origin) return cb(null, true);

      // if not configured, allow any origin (dev-friendly)
      if (allowed.length === 0) return cb(null, true);

      return cb(null, allowed.includes(origin));
    },
    credentials: true,
  })
);
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const recipeRoutes = require('./routes/recipeRoutes');
app.use('/api/recipes', recipeRoutes);

const ingredientRoutes = require('./routes/ingredientRoutes');
app.use('/api/ingredients', ingredientRoutes);

const favoriteRoutes = require('./routes/favoriteRoutes');
app.use('/api/favorites', favoriteRoutes);

const suggestionRoutes = require('./routes/suggestionRoutes');
app.use('/api/suggestions', suggestionRoutes);

const ratingRoutes = require('./routes/ratingRoutes.js');
app.use('/api/ratings', ratingRoutes);

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => console.error('DB connection error:', err));