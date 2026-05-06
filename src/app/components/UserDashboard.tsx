import React from "react";
import { motion } from "motion/react";
import { Heart, Plus, TrendingUp, Award, Sparkles } from "lucide-react";
import { CircularCarousel } from "./CircularCarousel";
import { useEffect, useState } from "react";
import { api } from "../api/http";

export function UserDashboard({
  favorites,
  suggestions,
  onRecipeClick,
}: {
  favorites: { id?: string; title: string; image: string; calories: number; time: number; rating: number }[];
  suggestions: { id?: string; title: string; image: string; calories: number; time: number; rating: number }[];
  onRecipeClick?: (recipe: any) => void;
}) {
  const [quickLoading, setQuickLoading] = useState<string | null>(null);
  const [suggestPage, setSuggestPage] = useState(1);
  const suggestPageSize = 4;

  useEffect(() => {
    setSuggestPage(1);
  }, [suggestions.length]);

  type MealSummary = { idMeal: string; strMeal: string; strMealThumb: string };

  const toUiRecipe = (meal: MealSummary, index: number) => {
    const pseudo = (Number(meal.idMeal.slice(-3)) || index + 1) % 100;
    return {
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      calories: 250 + pseudo * 5,
      time: 15 + (pseudo % 40),
      rating: Number((4 + (pseudo % 10) / 10).toFixed(1)),
      servings: 2 + (pseudo % 4),
    };
  };

  return (
    <div id="user-dashboard" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl md:text-5xl text-[var(--beige)] mb-2" style={{ fontWeight: 700 }}>
                My Kitchen
              </h2>
              <p className="text-lg text-[var(--muted-foreground)]">
                Your personal recipe collection and cooking stats
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[var(--orange)] text-[var(--black)] rounded-full flex items-center gap-2 hover:shadow-xl hover:shadow-[rgba(255,107,53,0.3)] transition-all"
              style={{ fontWeight: 600 }}
            >
              <Plus className="w-5 h-5" />
              Add Recipe
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[rgba(255,107,53,0.2)] flex items-center justify-center">
                  <Heart className="w-7 h-7 text-[var(--orange)]" />
                </div>
                <div>
                  <div className="text-3xl text-[var(--beige)]" style={{ fontWeight: 700 }}>
                    {favorites.length}
                  </div>
                  <div className="text-[var(--muted-foreground)]">Saved Recipes</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[rgba(26,58,46,0.5)] flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-[var(--beige)]" />
                </div>
                <div>
                  <div className="text-3xl text-[var(--beige)]" style={{ fontWeight: 700 }}>
                    {Math.min(12, favorites.length)}
                  </div>
                  <div className="text-[var(--muted-foreground)]">Recipes Shared</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -4 }}
              className="bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[rgba(255,107,53,0.2)] flex items-center justify-center">
                  <Award className="w-7 h-7 text-[var(--orange)]" />
                </div>
                <div>
                  <div className="text-3xl text-[var(--beige)]" style={{ fontWeight: 700 }}>
                    4.8
                  </div>
                  <div className="text-[var(--muted-foreground)]">Avg. Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="mb-12">
          <h3 className="text-3xl text-[var(--beige)] mb-8 text-center" style={{ fontWeight: 700 }}>
            Your Favorite Recipes
          </h3>
          {favorites.length === 0 ? (
            <div className="text-center text-[var(--muted-foreground)] py-6">
              No favorites yet. Tap the heart on any recipe.
            </div>
          ) : (
            <CircularCarousel recipes={favorites} onRecipeClick={onRecipeClick} />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-[rgba(255,107,53,0.2)] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[var(--orange)]" />
            </div>
            <div>
              <h3 className="text-2xl text-[var(--beige)]" style={{ fontWeight: 700 }}>
                Suggested For You
              </h3>
              <p className="text-[var(--muted-foreground)]">
                Based on your recent activity and favorites
              </p>
            </div>
          </div>

          {(() => {
            const totalPages = Math.max(1, Math.ceil(suggestions.length / suggestPageSize));
            const page = Math.min(suggestPage, totalPages);
            const start = (page - 1) * suggestPageSize;
            const pageItems = suggestions.slice(start, start + suggestPageSize);

            return (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pageItems.map((recipe, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                onClick={() => onRecipeClick?.(recipe)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] hover:border-[var(--orange)] transition-all">
                  <div className="flex gap-4 p-4">
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] to-transparent opacity-60" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg text-[var(--beige)] group-hover:text-[var(--orange)] transition-colors" style={{ fontWeight: 600 }}>
                          {recipe.title}
                        </h4>
                        <div className="flex items-center gap-1 text-sm">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                          >
                            ⭐
                          </motion.div>
                          <span className="text-[var(--beige)]">{recipe.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                        <span>{recipe.calories} cal</span>
                        <span>•</span>
                        <span>{recipe.time} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
                  ))}
                </div>

                {suggestions.length > suggestPageSize && (
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                      onClick={() => setSuggestPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                      className={`px-5 py-2 rounded-full border border-[var(--glass-border)] text-[var(--beige)] transition-all ${
                        page <= 1 ? "opacity-50 cursor-not-allowed" : "hover:border-[var(--orange)]"
                      }`}
                    >
                      Prev
                    </button>
                    <div className="text-sm text-[var(--muted-foreground)]">
                      Page {page} / {totalPages}
                    </div>
                    <button
                      onClick={() => setSuggestPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                      className={`px-5 py-2 rounded-full border border-[var(--glass-border)] text-[var(--beige)] transition-all ${
                        page >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:border-[var(--orange)]"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            );
          })()}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-2xl p-8"
        >
          <h3 className="text-2xl text-[var(--beige)] mb-6" style={{ fontWeight: 600 }}>
            Quick Recipes with Your Ingredients
          </h3>
          <p className="text-[var(--muted-foreground)] mb-6">
            Based on your saved recipes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(favorites.length > 0
              ? favorites.slice(0, 4).map((f) => f.title)
              : []).map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                onClick={async () => {
                  if (!onRecipeClick) return;
                  setQuickLoading(suggestion);
                  try {
                    const meals = await api<MealSummary[]>(`/api/recipes/search?s=${encodeURIComponent(suggestion)}`);
                    const first = Array.isArray(meals) ? meals[0] : null;
                    if (!first) return;
                    onRecipeClick(toUiRecipe(first, 0));
                  } finally {
                    setQuickLoading(null);
                  }
                }}
                className="flex items-center justify-between p-4 bg-[rgba(26,58,46,0.3)] border border-[var(--glass-border)] rounded-xl cursor-pointer hover:border-[var(--orange)] transition-colors"
              >
                <span className="text-[var(--beige)]">{suggestion}</span>
                <span className="text-[var(--orange)]">{quickLoading === suggestion ? "…" : "→"}</span>
              </motion.div>
            ))}
          </div>

          {favorites.length === 0 && (
            <div className="text-sm text-[var(--muted-foreground)]">
              Save some recipes to get quick suggestions here.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
