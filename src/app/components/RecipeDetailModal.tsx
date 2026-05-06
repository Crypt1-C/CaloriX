import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Clock, Flame, Users, Star, Minus, Plus, Play, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../api/http";

interface RecipeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: {
    id?: string;
    title: string;
    image: string;
    calories: number;
    time: number;
    rating: number;
    servings?: number;
    videoUrl?: string;
  };
  onWatchVideo?: (video: { title: string; videoUrl: string }) => void;
  isLoggedIn?: boolean;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
}

export function RecipeDetailModal({
  isOpen,
  onClose,
  recipe,
  onWatchVideo,
  isLoggedIn = false,
  isFavorited = false,
  onToggleFavorite,
}: RecipeDetailModalProps) {
  const recipeId = recipe?.id || (recipe as any)?.idMeal;
  const [servings, setServings] = useState(recipe.servings || 4);
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState<string | null>(null);
  const [ratingSubmitting, setRatingSubmitting] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(recipe.videoUrl || null);
  const [favoriteSubmitting, setFavoriteSubmitting] = useState(false);
  const [favoriteError, setFavoriteError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    setServings(recipe.servings || 4);
    setUserRating(0);
    setAverageRating(null);
    setVideoUrl(recipe.videoUrl || null);
    setFavoriteSubmitting(false);
    setFavoriteError(null);
    if (!isOpen || !recipeId) return;
    api<{ ratings: any[]; average: string }>(`/api/ratings/${recipeId}`)
      .then((data) => setAverageRating(data?.average ?? null))
      .catch(() => setAverageRating(null));
  }, [isOpen, recipeId, recipe?.servings]);

  useEffect(() => {
    if (!isOpen || !recipeId) return;
    type MealDetail = { strYoutube?: string };
    api<MealDetail>(`/api/recipes/${recipeId}`)
      .then((d) => setVideoUrl(d?.strYoutube || null))
      .catch(() => setVideoUrl(null));
  }, [isOpen, recipeId]);

  const ingredients = [
    { name: 'Arborio Rice', amount: 300, unit: 'g' },
    { name: 'Mushrooms', amount: 400, unit: 'g' },
    { name: 'Parmesan Cheese', amount: 100, unit: 'g' },
    { name: 'White Wine', amount: 150, unit: 'ml' },
    { name: 'Vegetable Stock', amount: 1000, unit: 'ml' },
    { name: 'Truffle Oil', amount: 2, unit: 'tbsp' },
    { name: 'Butter', amount: 50, unit: 'g' },
    { name: 'Onion', amount: 1, unit: 'piece' }
  ];

  const steps = [
    'Heat the vegetable stock in a pot and keep warm.',
    'Sauté finely chopped onion in butter until translucent.',
    'Add arborio rice and toast for 2 minutes, stirring constantly.',
    'Pour in white wine and let it absorb completely.',
    'Add stock one ladle at a time, stirring frequently until absorbed.',
    'Sauté sliced mushrooms separately in olive oil until golden.',
    'Fold mushrooms and parmesan into the risotto.',
    'Finish with truffle oil and serve immediately.'
  ];

  const adjustedCalories = Math.round((recipe.calories * servings) / (recipe.servings || 4));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[rgba(0,0,0,0.8)] backdrop-blur-sm z-[60]"
          />
          <div className="fixed inset-0 flex items-center justify-center z-[70] p-6 overflow-y-auto pointer-events-none">
            <div className="pointer-events-auto" onClick={onClose}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl overflow-hidden shadow-2xl my-8"
            >
              <div className="relative h-80 overflow-hidden bg-[var(--dark-green)]">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover block"
                  loading="eager"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    console.error('Image failed to load:', recipe.image);
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] via-transparent to-transparent opacity-80" />

                <div className="absolute top-6 right-6 z-20 flex gap-3">
                  {recipeId && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={async () => {
                        if (!isLoggedIn) {
                          setFavoriteError("Please sign in to save recipes.");
                          return;
                        }
                        if (!onToggleFavorite) return;
                        setFavoriteError(null);
                        setFavoriteSubmitting(true);
                        try {
                          await onToggleFavorite();
                        } catch (e: any) {
                          setFavoriteError(e?.message || "Failed to save recipe");
                        } finally {
                          setFavoriteSubmitting(false);
                        }
                      }}
                      disabled={!isLoggedIn || favoriteSubmitting}
                      className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                        isFavorited
                          ? "bg-[rgba(255,107,53,0.2)] text-[var(--orange)] border border-[rgba(255,107,53,0.5)]"
                          : "bg-[rgba(0,0,0,0.35)] text-white border border-[var(--glass-border)]"
                      } ${!isLoggedIn || favoriteSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
                      style={{ fontWeight: 600 }}
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? "fill-[var(--orange)]" : ""}`} />
                      {favoriteSubmitting ? "Saving…" : isFavorited ? "Saved" : "Save"}
                    </motion.button>
                  )}
                  {videoUrl && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onWatchVideo?.({
                          title: `How to Make ${recipe.title}`,
                          videoUrl: videoUrl
                        });
                      }}
                      className="px-4 py-2 bg-[var(--orange)] text-[var(--black)] rounded-full flex items-center gap-2 hover:shadow-lg hover:shadow-[rgba(255,107,53,0.3)] transition-all"
                      style={{ fontWeight: 600 }}
                    >
                      <Play className="w-4 h-4" />
                      Watch Video
                    </motion.button>
                  )}
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-[rgba(0,0,0,0.5)] backdrop-blur-md flex items-center justify-center text-white hover:bg-[var(--orange)] transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h2 className="text-4xl text-[var(--beige)] mb-4" style={{ fontWeight: 700 }}>
                    {recipe.title}
                  </h2>
                  {favoriteError && (
                    <div className="text-sm text-[var(--orange)] mb-3">
                      {favoriteError}
                    </div>
                  )}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[var(--beige)]">
                      <Flame className="w-5 h-5 text-[var(--orange)]" />
                      <span>{adjustedCalories} cal</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--beige)]">
                      <Clock className="w-5 h-5" />
                      <span>{recipe.time} min</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--beige)]">
                      <Star className="w-5 h-5 fill-[var(--orange)] text-[var(--orange)]" />
                      <span>{recipe.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl text-[var(--beige)]" style={{ fontWeight: 600 }}>
                      Servings
                    </h3>
                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setServings(Math.max(1, servings - 1))}
                        className="w-10 h-10 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center hover:border-[var(--orange)] transition-colors"
                      >
                        <Minus className="w-5 h-5 text-[var(--beige)]" />
                      </motion.button>
                      <span className="text-2xl text-[var(--beige)] w-12 text-center" style={{ fontWeight: 600 }}>
                        {servings}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setServings(servings + 1)}
                        className="w-10 h-10 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center hover:border-[var(--orange)] transition-colors"
                      >
                        <Plus className="w-5 h-5 text-[var(--beige)]" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-2xl text-[var(--beige)] mb-4" style={{ fontWeight: 600 }}>
                      Ingredients
                    </h3>
                    <ul className="space-y-3">
                      {ingredients.map((ingredient, index) => {
                        const adjustedAmount = ingredient.unit === 'piece'
                          ? Math.ceil((ingredient.amount * servings) / (recipe.servings || 4))
                          : Math.round((ingredient.amount * servings) / (recipe.servings || 4));
                        return (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between py-2 px-4 bg-[rgba(26,58,46,0.2)] rounded-lg"
                          >
                            <span className="text-[var(--beige)]">{ingredient.name}</span>
                            <span className="text-[var(--muted-foreground)]">
                              {adjustedAmount} {ingredient.unit}
                            </span>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl text-[var(--beige)] mb-4" style={{ fontWeight: 600 }}>
                      Instructions
                    </h3>
                    <ol className="space-y-4">
                      {steps.map((step, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex gap-4"
                        >
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--orange)] text-[var(--black)] flex items-center justify-center" style={{ fontWeight: 600 }}>
                            {index + 1}
                          </span>
                          <span className="text-[var(--muted-foreground)] flex-1 pt-1">
                            {step}
                          </span>
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="border-t border-[var(--glass-border)] pt-6">
                  <h3 className="text-xl text-[var(--beige)] mb-4" style={{ fontWeight: 600 }}>
                    Rate this recipe
                  </h3>
                  <div className="text-sm text-[var(--muted-foreground)] mb-3">
                    {averageRating ? `Community average: ${averageRating}/5` : recipe?.id ? "Community average: —" : "Community average: —"}
                    {!isLoggedIn && recipe?.id ? " (sign in to rate)" : ""}
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <motion.button
                        key={rating}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={!isLoggedIn || !recipeId || ratingSubmitting}
                        onClick={async () => {
                          if (!isLoggedIn || !recipeId) return;
                          setUserRating(rating);
                          setRatingSubmitting(true);
                          try {
                            await api("/api/ratings", {
                              method: "POST",
                              auth: true,
                              body: { recipeId: recipeId, recipeName: recipe.title, rating },
                            });
                            const data = await api<{ ratings: any[]; average: string }>(`/api/ratings/${recipeId}`);
                            setAverageRating(data?.average ?? null);
                          } finally {
                            setRatingSubmitting(false);
                          }
                        }}
                        className="transition-colors"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            rating <= userRating
                              ? 'fill-[var(--orange)] text-[var(--orange)]'
                              : 'text-[var(--glass-border)]'
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
