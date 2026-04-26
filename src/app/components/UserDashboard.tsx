import { motion } from "motion/react";
import { Heart, Plus, TrendingUp, Award, Sparkles } from "lucide-react";
import { CircularCarousel } from "./CircularCarousel";

const favoriteRecipes = [
  {
    title: "Truffle Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1763867641141-50e00520f189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 380,
    time: 35,
    rating: 4.9
  },
  {
    title: "Grilled Salmon",
    image: "https://images.unsplash.com/photo-1774921676942-90c6cfe9d541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 420,
    time: 25,
    rating: 4.8
  },
  {
    title: "Fresh Spring Salad",
    image: "https://images.unsplash.com/photo-1769816042376-e7b16f728013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 220,
    time: 15,
    rating: 4.7
  },
  {
    title: "Mediterranean Bowl",
    image: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 420,
    time: 25,
    rating: 4.8
  },
  {
    title: "Spicy Ramen",
    image: "https://images.unsplash.com/photo-1623428188495-89c064ee061a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 520,
    time: 30,
    rating: 4.9
  }
];

const suggestedRecipes = [
  {
    title: "Creamy Mushroom Pasta",
    reason: "Similar to your favorite Truffle Risotto",
    image: "https://images.unsplash.com/photo-1712746784067-e9e1bd86c043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 480,
    time: 25,
    rating: 4.7
  },
  {
    title: "Herb Crusted Salmon",
    reason: "Matches your preference for seafood dishes",
    image: "https://images.unsplash.com/photo-1632778129004-f142ce499b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 390,
    time: 30,
    rating: 4.9
  },
  {
    title: "Rainbow Buddha Bowl",
    reason: "Based on your love for healthy salads",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 350,
    time: 20,
    rating: 4.6
  },
  {
    title: "Truffle Mac & Cheese",
    reason: "Combines your favorite truffle flavor",
    image: "https://images.unsplash.com/photo-1712746784296-e62c1cc7b1f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 620,
    time: 35,
    rating: 4.8
  }
];

export function UserDashboard({ onRecipeClick }: { onRecipeClick?: (recipe: any) => void }) {
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
                    47
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
                    12
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
          <CircularCarousel recipes={favoriteRecipes} onRecipeClick={onRecipeClick} />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestedRecipes.map((recipe, index) => (
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
                      <p className="text-sm text-[var(--muted-foreground)] mb-3 italic">
                        {recipe.reason}
                      </p>
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
            Based on your pantry: Chicken, Tomatoes, Garlic, Pasta, Olive Oil
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Chicken Marinara', 'Garlic Pasta Aglio', 'Tomato Basil Chicken', 'Mediterranean Pasta'].map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-4 bg-[rgba(26,58,46,0.3)] border border-[var(--glass-border)] rounded-xl cursor-pointer hover:border-[var(--orange)] transition-colors"
              >
                <span className="text-[var(--beige)]">{suggestion}</span>
                <span className="text-[var(--orange)]">→</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
