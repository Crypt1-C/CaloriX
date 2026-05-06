import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { SearchSection } from "./components/SearchSection";
import { PopularRecipes } from "./components/PopularRecipes";
import { WatchAndCook } from "./components/WatchAndCook";
import { UserDashboard } from "./components/UserDashboard";
import { Footer } from "./components/Footer";
import { AuthModal } from "./components/AuthModal";
import { RecipeDetailModal } from "./components/RecipeDetailModal";
import { ScrollToTop } from "./components/ScrollToTop";
import { FeatureHighlights } from "./components/FeatureHighlights";
import { CTASection } from "./components/CTASection";
import { VideoModal } from "./components/VideoModal";
import { WelcomeBanner } from "./components/WelcomeBanner";
import { api, clearAuthToken, getAuthToken } from "./api/http";

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; videoUrl: string } | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [favorites, setFavorites] = useState<
    { _id: string; mealId: string; mealName: string; mealImage: string }[]
  >([]);
  const [suggestions, setSuggestions] = useState<
    { id: string; title: string; image: string; calories: number; time: number; rating: number }[]
  >([]);
  const [heroRecipe, setHeroRecipe] = useState<any>(null);
  const [heroVideo, setHeroVideo] = useState<{ title: string; videoUrl: string } | null>(null);

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
  }, []);

  useEffect(() => {
    let alive = true;

    type MealSummary = { idMeal: string; strMeal: string; strMealThumb: string };
    type MealDetail = { idMeal: string; strMeal: string; strMealThumb: string; strYoutube?: string };

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

    (async () => {
      try {
        const meals = await api<MealSummary[]>("/api/recipes");
        const list = Array.isArray(meals) ? meals : [];
        if (list.length === 0) return;
        const pickIndex = Math.floor(Math.random() * Math.min(25, list.length));
        const picked = list[pickIndex] || list[0];
        const ui = toUiRecipe(picked, pickIndex);

        // Fetch details for video link (YouTube) if available
        let videoUrl: string | undefined;
        try {
          const detail = await api<MealDetail>(`/api/recipes/${picked.idMeal}`);
          videoUrl = detail?.strYoutube;
        } catch {
          videoUrl = undefined;
        }

        if (!alive) return;
        setHeroRecipe({ ...ui, videoUrl });
        if (videoUrl) {
          setHeroVideo({ title: `How to Make ${ui.title}`, videoUrl });
        } else {
          setHeroVideo(null);
        }
      } catch {
        // Keep null → UI will fall back below
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setFavorites([]);
      setSuggestions([]);
      return;
    }
    api<{ _id: string; mealId: string; mealName: string; mealImage: string }[]>("/api/favorites", {
      auth: true,
    })
      .then((data) => setFavorites(Array.isArray(data) ? data : []))
      .catch(() => setFavorites([]));
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      setShowWelcome(true);
      const timer = setTimeout(() => {
        const dashboardElement = document.getElementById("user-dashboard");
        if (dashboardElement) {
          dashboardElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowWelcome(false);
    }
  }, [isLoggedIn]);

  const heroFallback = {
    title: "Featured Recipe",
    image:
      "https://images.unsplash.com/photo-1774921677519-e2aeb343e9b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 380,
    time: 35,
    rating: 4.9,
    servings: 4,
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation
        onAuthClick={() => setIsAuthModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          clearAuthToken();
          setIsLoggedIn(false);
        }}
        onSearchClick={() => {
          const el = document.getElementById("search-section");
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            (document.getElementById("search-input") as HTMLInputElement | null)?.focus();
          }, 300);
        }}
        onFavoritesClick={() => {
          if (!isLoggedIn) {
            setIsAuthModalOpen(true);
            return;
          }
          const el = document.getElementById("user-dashboard");
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />

      <HeroSection
        recipe={heroRecipe || heroFallback}
        onGetRecipe={() => {
          if (heroRecipe) setSelectedRecipe(heroRecipe);
        }}
        onWatchVideo={() => {
          if (heroVideo) setSelectedVideo(heroVideo);
        }}
      />

      <SearchSection
        isLoggedIn={isLoggedIn}
        favorites={favorites}
        onToggleFavorite={async (recipe) => {
          if (!isLoggedIn || !recipe?.id) return;
          const existing = favorites.find((f) => f.mealId === recipe.id);
          if (existing) {
            await api(`/api/favorites/${existing._id}`, { method: "DELETE", auth: true });
            setFavorites((prev) => prev.filter((f) => f._id !== existing._id));
          } else {
            const res = await api<{ favorite: { _id: string; mealId: string; mealName: string; mealImage: string } }>(
              "/api/favorites",
              {
                method: "POST",
                auth: true,
                body: { mealId: recipe.id, mealName: recipe.title, mealImage: recipe.image },
              }
            );
            if (res?.favorite) setFavorites((prev) => [res.favorite, ...prev]);
          }
        }}
        onRecipeClick={setSelectedRecipe}
        onSuggestionsLoaded={setSuggestions}
      />

      <PopularRecipes
        onRecipeClick={setSelectedRecipe}
        isLoggedIn={isLoggedIn}
        favorites={favorites}
        onToggleFavorite={async (recipe) => {
          if (!isLoggedIn || !recipe?.id) return;
          const existing = favorites.find((f) => f.mealId === recipe.id);
          if (existing) {
            await api(`/api/favorites/${existing._id}`, { method: "DELETE", auth: true });
            setFavorites((prev) => prev.filter((f) => f._id !== existing._id));
          } else {
            const res = await api<{ favorite: { _id: string; mealId: string; mealName: string; mealImage: string } }>(
              "/api/favorites",
              {
                method: "POST",
                auth: true,
                body: { mealId: recipe.id, mealName: recipe.title, mealImage: recipe.image },
              }
            );
            if (res?.favorite) setFavorites((prev) => [res.favorite, ...prev]);
          }
        }}
      />

      <WatchAndCook onVideoClick={setSelectedVideo} />

      <FeatureHighlights />

      {!isLoggedIn && <CTASection onSignUpClick={() => setIsAuthModalOpen(true)} />}

      {isLoggedIn && (
        <UserDashboard
          favorites={favorites.map((f) => ({
            id: f.mealId,
            title: f.mealName,
            image: f.mealImage,
            calories: 400,
            time: 25,
            rating: 4.7,
          }))}
          suggestions={suggestions}
          onRecipeClick={setSelectedRecipe}
        />
      )}

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsLoggedIn(true)}
      />

      <RecipeDetailModal
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        recipe={selectedRecipe || heroRecipe || heroFallback}
        onWatchVideo={setSelectedVideo}
        isLoggedIn={isLoggedIn}
        isFavorited={
          !!(selectedRecipe?.id || (selectedRecipe as any)?.idMeal) &&
          favorites.some((f) => f.mealId === (selectedRecipe?.id || (selectedRecipe as any)?.idMeal))
        }
        onToggleFavorite={async () => {
          const recipeId = selectedRecipe?.id || (selectedRecipe as any)?.idMeal;
          if (!isLoggedIn || !recipeId) return;
          const existing = favorites.find((f) => f.mealId === recipeId);
          if (existing) {
            await api(`/api/favorites/${existing._id}`, { method: "DELETE", auth: true });
            setFavorites((prev) => prev.filter((f) => f._id !== existing._id));
          } else {
            const res = await api<{ favorite: { _id: string; mealId: string; mealName: string; mealImage: string } }>(
              "/api/favorites",
              {
                method: "POST",
                auth: true,
                body: {
                  mealId: recipeId,
                  mealName: selectedRecipe.title,
                  mealImage: selectedRecipe.image,
                },
              }
            );
            if (res?.favorite) setFavorites((prev) => [res.favorite, ...prev]);
          }
        }}
      />

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl || ""}
        title={selectedVideo?.title || ""}
      />

      <ScrollToTop />

      <WelcomeBanner show={showWelcome} userName="Chef" />
    </div>
  );
}