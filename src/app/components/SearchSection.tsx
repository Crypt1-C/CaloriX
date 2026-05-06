import { motion } from "motion/react";
import { Search, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { api } from "../api/http";
import { RecipeCard } from "./RecipeCard";

type MealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type Ingredient = { _id: string; name: string };

function toUiRecipe(meal: MealSummary, index: number) {
  const pseudo = (Number(meal.idMeal.slice(-3)) || index + 1) % 100;
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    calories: 250 + pseudo * 5,
    time: 15 + (pseudo % 40),
    rating: Number((4 + (pseudo % 10) / 10).toFixed(1)),
  };
}

export function SearchSection({
  isLoggedIn,
  favorites,
  onToggleFavorite,
  onRecipeClick,
  onSuggestionsLoaded,
}: {
  isLoggedIn: boolean;
  favorites: { _id: string; mealId: string }[];
  onToggleFavorite: (recipe: { id: string; title: string; image: string }) => Promise<void>;
  onRecipeClick?: (recipe: any) => void;
  onSuggestionsLoaded?: (recipes: any[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [searchMeals, setSearchMeals] = useState<MealSummary[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredientSaving, setIngredientSaving] = useState(false);
  const [ingredientError, setIngredientError] = useState<string | null>(null);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [suggestMeals, setSuggestMeals] = useState<MealSummary[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      setIngredients([]);
      setNewIngredient("");
      return;
    }
    api<Ingredient[]>("/api/ingredients", { auth: true })
      .then((data) => setIngredients(Array.isArray(data) ? data : []))
      .catch(() => setIngredients([]));
  }, [isLoggedIn]);

  useEffect(() => {
    const q = query.trim();
    setSearchError(null);
    if (q.length < 2) {
      setSearchMeals([]);
      return;
    }
    setSearchLoading(true);
    const t = setTimeout(() => {
      api<MealSummary[]>(`/api/recipes/search?s=${encodeURIComponent(q)}`)
        .then((data) => setSearchMeals(Array.isArray(data) ? data : []))
        .catch((e: any) => {
          setSearchError(e?.message || "Search failed");
          setSearchMeals([]);
        })
        .finally(() => setSearchLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const searchResults = useMemo(() => searchMeals.slice(0, 12).map(toUiRecipe), [searchMeals]);
  const suggestResults = useMemo(() => suggestMeals.slice(0, 8).map(toUiRecipe), [suggestMeals]);

  return (
    <div id="search-section" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl text-[var(--beige)] mb-4" style={{ fontWeight: 700 }}>
            Find Your Perfect Recipe
          </h2>
          <p className="text-lg text-[var(--muted-foreground)]">
            Search by name or add your ingredients for personalized suggestions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              id="search-input"
              className="w-full pl-16 pr-6 py-5 bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-2xl text-[var(--beige)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--orange)] transition-all"
            />
          </div>
        </motion.div>

        {(searchLoading || searchError || searchResults.length > 0) && (
          <div className="mb-10">
            {searchLoading ? (
              <div className="text-center text-[var(--muted-foreground)] py-6">Searching…</div>
            ) : searchError ? (
              <div className="text-center text-[var(--orange)] py-6">{searchError}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((r, idx) => (
                  <RecipeCard
                    key={r.id}
                    {...r}
                    delay={idx * 0.05}
                    isFavorited={favorites.some((f) => f.mealId === r.id)}
                    disableFavorite={!isLoggedIn}
                    onToggleFavorite={() => onToggleFavorite({ id: r.id, title: r.title, image: r.image })}
                    onClick={() => onRecipeClick?.(r)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-[var(--beige)]" style={{ fontWeight: 600 }}>
              My Ingredients
            </h3>
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <input
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  placeholder="Add ingredient…"
                  className="px-4 py-2 bg-[rgba(26,58,46,0.3)] border border-[var(--glass-border)] rounded-full text-[var(--beige)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--orange)] transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={ingredientSaving}
                  onClick={async () => {
                    setIngredientError(null);
                    const trimmed = newIngredient.trim();
                    if (!trimmed) return;
                    setIngredientSaving(true);
                    try {
                      const res = await api<{ ingredient: Ingredient }>("/api/ingredients", {
                        method: "POST",
                        auth: true,
                        body: { name: trimmed },
                      });
                      if (res?.ingredient) {
                        setIngredients((prev) => [res.ingredient, ...prev]);
                        setNewIngredient("");
                      }
                    } catch (e: any) {
                      setIngredientError(e?.message || "Failed to add ingredient");
                    } finally {
                      setIngredientSaving(false);
                    }
                  }}
                  className="px-4 py-2 bg-[var(--orange)] text-[var(--black)] rounded-full flex items-center gap-2"
                  style={{ fontWeight: 500 }}
                >
                  <Plus className="w-4 h-4" />
                  {ingredientSaving ? "Adding…" : "Add"}
                </motion.button>
              </div>
            ) : (
              <div className="text-sm text-[var(--muted-foreground)]">
                Sign in to save ingredients.
              </div>
            )}
          </div>

          {ingredientError && (
            <div className="text-sm text-[var(--orange)] mb-4">{ingredientError}</div>
          )}

          <div className="flex flex-wrap gap-3">
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={async () => {
                  // show recipes that contain this ingredient
                  setSuggestLoading(true);
                  try {
                    const data = await api<MealSummary[]>(
                      `/api/recipes/by-ingredient?i=${encodeURIComponent(ingredient.name)}`
                    );
                    setSuggestMeals(Array.isArray(data) ? data : []);
                    onSuggestionsLoaded?.(Array.isArray(data) ? data.map(toUiRecipe) : []);
                  } finally {
                    setSuggestLoading(false);
                  }
                }}
                className={`px-4 py-2 bg-[rgba(26,58,46,0.5)] border border-[var(--glass-border)] rounded-full text-[var(--beige)] cursor-pointer hover:border-[var(--orange)] transition-colors ${
                  "hover:opacity-90"
                }`}
              >
                {ingredient.name}
              </motion.div>
            ))}
          </div>

          {!isLoggedIn && (
            <div className="text-sm text-[var(--muted-foreground)] mt-4">
              Sign in to manage ingredients and get personalized suggestions.
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={suggestLoading}
            onClick={async () => {
              setSuggestLoading(true);
              try {
                if (!isLoggedIn) return;
                const data = await api<MealSummary[]>("/api/suggestions", { auth: true });
                setSuggestMeals(Array.isArray(data) ? data : []);
                onSuggestionsLoaded?.(Array.isArray(data) ? data.map(toUiRecipe) : []);
              } finally {
                setSuggestLoading(false);
              }
            }}
            className={`w-full mt-8 py-4 bg-[var(--dark-green)] border border-[var(--glass-border)] text-[var(--beige)] rounded-xl transition-all ${
              isLoggedIn ? "hover:bg-[rgba(26,58,46,0.8)]" : "opacity-50 cursor-not-allowed"
            }`}
            style={{ fontWeight: 600 }}
          >
            {suggestLoading ? "Loading…" : "Find Recipes with These Ingredients"}
          </motion.button>

          {suggestResults.length > 0 && (
            <div className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestResults.map((r, idx) => (
                  <RecipeCard
                    key={r.id}
                    {...r}
                    delay={idx * 0.05}
                    isFavorited={favorites.some((f) => f.mealId === r.id)}
                    disableFavorite={!isLoggedIn}
                    onToggleFavorite={() => onToggleFavorite({ id: r.id, title: r.title, image: r.image })}
                    onClick={() => onRecipeClick?.(r)}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
