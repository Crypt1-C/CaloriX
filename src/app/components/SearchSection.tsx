import { motion } from "motion/react";
import { Search, Plus } from "lucide-react";
import { useState } from "react";

export function SearchSection() {
  const [ingredients, setIngredients] = useState<string[]>(['Chicken', 'Tomatoes', 'Garlic']);

  return (
    <div className="py-20 px-6">
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
              className="w-full pl-16 pr-6 py-5 bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-2xl text-[var(--beige)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--orange)] transition-all"
            />
          </div>
        </motion.div>

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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-[var(--orange)] text-[var(--black)] rounded-full flex items-center gap-2"
              style={{ fontWeight: 500 }}
            >
              <Plus className="w-4 h-4" />
              Add Ingredient
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-3">
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-[rgba(26,58,46,0.5)] border border-[var(--glass-border)] rounded-full text-[var(--beige)] cursor-pointer hover:border-[var(--orange)] transition-colors"
              >
                {ingredient}
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 py-4 bg-[var(--dark-green)] border border-[var(--glass-border)] text-[var(--beige)] rounded-xl hover:bg-[rgba(26,58,46,0.8)] transition-all"
            style={{ fontWeight: 600 }}
          >
            Find Recipes with These Ingredients
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
