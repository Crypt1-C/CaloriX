import { motion } from "motion/react";
import { RecipeCard } from "./RecipeCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const recipes = [
  {
    title: "Mediterranean Buddha Bowl",
    image: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 420,
    time: 25,
    rating: 4.8
  },
  {
    title: "Spicy Ramen Bowl",
    image: "https://images.unsplash.com/photo-1623428188495-89c064ee061a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 520,
    time: 30,
    rating: 4.9
  },
  {
    title: "Poke Bowl",
    image: "https://images.unsplash.com/photo-1667499823726-f2c6fc321b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 380,
    time: 20,
    rating: 4.7
  },
  {
    title: "Green Goddess Salad",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 290,
    time: 15,
    rating: 4.6
  },
  {
    title: "Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1712746784067-e9e1bd86c043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 650,
    time: 25,
    rating: 4.9
  },
  {
    title: "Seafood Pasta",
    image: "https://images.unsplash.com/photo-1762631178597-847861217da0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 580,
    time: 35,
    rating: 4.8
  }
];

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

export function PopularRecipes({ onRecipeClick }: { onRecipeClick?: (recipe: any) => void }) {
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
          <Slider {...settings}>
            {recipes.map((recipe, index) => (
              <div key={index} className="px-3">
                <RecipeCard
                  {...recipe}
                  delay={index * 0.1}
                  onClick={() => onRecipeClick?.(recipe)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
