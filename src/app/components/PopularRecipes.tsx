import { motion } from "motion/react";
import { RecipeCard } from "./RecipeCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { api } from "../api/http";

type MealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

function toUiRecipe(meal: MealSummary, index: number) {
  // TheMealDB doesn't provide calories/time/rating; use stable placeholders.
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

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] flex items-center justify-center hover:bg-[var(--orange)] hover:text-[var(--black)] transition-all"
    >
      <ChevronRight className="w-6 h-6" />
    </motion.button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] flex items-center justify-center hover:bg-[var(--orange)] hover:text-[var(--black)] transition-all"
    >
      <ChevronLeft className="w-6 h-6" />
    </motion.button>
  );
}

export function PopularRecipes({
  onRecipeClick,
  isLoggedIn,
  favorites,
  onToggleFavorite,
}: {
  onRecipeClick?: (recipe: any) => void;
  isLoggedIn: boolean;
  favorites: { _id: string; mealId: string }[];
  onToggleFavorite: (recipe: { id: string; title: string; image: string }) => Promise<void>;
}) {
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    api<MealSummary[]>('/api/recipes')
      .then((data) => {
        if (!alive) return;
        setMeals(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!alive) return;
        setMeals([]);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const recipes = useMemo(() => meals.slice(0, 12).map(toUiRecipe), [meals]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    appendDots: (dots: any) => (
      <div style={{ bottom: "-50px" }}>
        <ul className="flex justify-center gap-2" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <button className="w-2 h-2 bg-[var(--glass-border)] rounded-full hover:bg-[var(--orange)] transition-all block" />
    )
  };

  return (
    <div className="py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-[var(--beige)] mb-4" style={{ fontWeight: 700 }}>
            Popular Recipes
          </h2>
          <p className="text-lg text-[var(--muted-foreground)]">
            Discover our most loved dishes from the community
          </p>
        </motion.div>

        <div className="pb-16">
          {loading ? (
            <div className="text-center text-[var(--muted-foreground)] py-10">
              Loading recipes…
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center text-[var(--muted-foreground)] py-10">
              No recipes found.
            </div>
          ) : (
            <Slider {...settings}>
              {recipes.map((recipe, index) => (
                <div key={recipe.id} className="px-3">
                  <RecipeCard
                    {...recipe}
                    delay={index * 0.1}
                    isFavorited={favorites.some((f) => f.mealId === recipe.id)}
                    disableFavorite={!isLoggedIn}
                    onToggleFavorite={() =>
                      onToggleFavorite({ id: recipe.id, title: recipe.title, image: recipe.image })
                    }
                    onClick={() => onRecipeClick?.(recipe)}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
}
