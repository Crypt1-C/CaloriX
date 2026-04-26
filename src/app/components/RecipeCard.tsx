import { motion } from "motion/react";
import { Clock, Flame, Star, Heart } from "lucide-react";
import { useState } from "react";

interface RecipeCardProps {
  title: string;
  image: string;
  calories: number;
  time: number;
  rating: number;
  delay?: number;
  onClick?: () => void;
}

export function RecipeCard({ title, image, calories, time, rating, delay = 0, onClick }: RecipeCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] shadow-2xl">
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] via-transparent to-transparent opacity-60" />

          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorited(!isFavorited);
            }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[rgba(0,0,0,0.5)] backdrop-blur-md flex items-center justify-center"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorited ? 'fill-[var(--orange)] text-[var(--orange)]' : 'text-white'
              }`}
            />
          </motion.button>
        </div>

        <div className="p-6">
          <h3 className="text-xl text-[var(--beige)] mb-4" style={{ fontWeight: 600 }}>
            {title}
          </h3>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
                <Flame className="w-4 h-4 text-[var(--orange)]" />
                <span>{calories} cal</span>
              </div>
              <div className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
                <Clock className="w-4 h-4 text-[var(--beige)]" />
                <span>{time} min</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[var(--orange)] text-[var(--orange)]" />
              <span className="text-[var(--beige)]" style={{ fontWeight: 500 }}>
                {rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
