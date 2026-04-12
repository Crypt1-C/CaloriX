const axios = require('axios');

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// 1.1 — Chercher par nom → GET /api/recipes/search?s=pasta
exports.searchRecipes = async (req, res) => {
  try {
    const { s } = req.query;
    const response = await axios.get(`${BASE_URL}/search.php?s=${s}`);
    res.json(response.data.meals || []);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la recherche' });
  }
};

// 1.2 — Chercher par ingrédient → GET /api/recipes/by-ingredient?i=chicken
exports.searchByIngredient = async (req, res) => {
  try {
    const { i } = req.query;
    const response = await axios.get(`${BASE_URL}/filter.php?i=${i}`);
    res.json(response.data.meals || []);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors du filtrage' });
  }
};

// 1.3 — Recettes aléatoires / toutes → GET /api/recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=`);
    res.json(response.data.meals || []);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors du chargement' });
  }
};

// 1.4 — Détails d'une recette → GET /api/recipes/:id
exports.getRecipeById = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${req.params.id}`);
    const meal = response.data.meals?.[0];
    if (!meal) return res.status(404).json({ message: 'Recette introuvable' });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors du chargement' });
  }
};