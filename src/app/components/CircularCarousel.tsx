import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Clock, Flame } from "lucide-react";
import { useState } from "react";

interface Recipe {
  id?: string;
  title: string;
  image: string;
  calories: number;
  time: number;
  rating: number;
}

interface CircularCarouselProps {
  recipes: Recipe[];
  onRecipeClick?: (recipe: Recipe) => void;
}

export function CircularCarousel({ recipes, onRecipeClick }: CircularCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? recipes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === recipes.length - 1 ? 0 : prev + 1));
  };

  const getPosition = (index: number) => {
    const diff = index - activeIndex;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -(recipes.length - 1)) return "right";
    if (diff === -1 || diff === recipes.length - 1) return "left";
    return "hidden";
  };

  return (
    <div className="relative py-20">
      <div className="relative h-[600px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {recipes.map((recipe, index) => {
            const position = getPosition(index);
            const isActive = position === "center";

            return (
              <motion.div
                key={index}
                layout
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{
                  scale: isActive ? 1 : 0.6,
                  opacity: position === "hidden" ? 0 : 1,
                  x:
                    position === "center"
                      ? "0%"
                      : position === "left"
                      ? "-120%"
                      : position === "right"
                      ? "120%"
                      : "0%",
                  y: isActive ? "-10%" : "20%",
                  zIndex: isActive ? 20 : 10,
                  filter: isActive ? "brightness(1)" : "brightness(0.6)",
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="absolute cursor-pointer"
                onClick={() => {
                  if (isActive && onRecipeClick) {
                    onRecipeClick(recipe);
                  } else {
                    setActiveIndex(index);
                  }
                }}
              >
                <div className="relative group">
                  <motion.div
                    animate={{
                      rotate: isActive ? [0, -3, 3, 0] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isActive ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                    className="relative"
                  >
                    <div
                      className="w-80 h-80 rounded-full overflow-hidden border-8 border-[var(--glass-border)] shadow-2xl"
                      style={{
                        boxShadow: isActive
                          ? "0 30px 60px rgba(255, 107, 53, 0.3), 0 0 80px rgba(255, 107, 53, 0.2)"
                          : "0 20px 40px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] via-transparent to-transparent opacity-60" />
                    </div>

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.3 }}
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm"
                      >
                        <div className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl p-6 shadow-2xl">
                          <h3
                            className="text-2xl text-[var(--beige)] mb-4 text-center"
                            style={{ fontWeight: 700 }}
                          >
                            {recipe.title}
                          </h3>
                          <div className="flex items-center justify-center gap-6">
                            <div className="flex items-center gap-2 text-[var(--beige)]">
                              <Flame className="w-5 h-5 text-[var(--orange)]" />
                              <span>{recipe.calories} cal</span>
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
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevious}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-16 h-16 rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] flex items-center justify-center hover:bg-[var(--orange)] hover:text-[var(--black)] transition-all shadow-2xl"
        >
          <ChevronLeft className="w-8 h-8" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-16 h-16 rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] flex items-center justify-center hover:bg-[var(--orange)] hover:text-[var(--black)] transition-all shadow-2xl"
        >
          <ChevronRight className="w-8 h-8" />
        </motion.button>
      </div>

      <div className="flex justify-center gap-3 mt-20">
        {recipes.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeIndex
                ? "bg-[var(--orange)] w-8"
                : "bg-[var(--glass-border)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
