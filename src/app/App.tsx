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

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; videoUrl: string } | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

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

  const heroRecipe = {
    title: "Truffle Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1763867641141-50e00520f189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 380,
    time: 35,
    rating: 4.9,
    servings: 4,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  };

  const heroVideo = {
    title: "How to Make Truffle Mushroom Risotto",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation
        onAuthClick={() => setIsAuthModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
      />

      <HeroSection
        onGetRecipe={() => setSelectedRecipe(heroRecipe)}
        onWatchVideo={() => setSelectedVideo(heroVideo)}
      />

      <SearchSection />

      <PopularRecipes onRecipeClick={setSelectedRecipe} />

      <WatchAndCook onVideoClick={setSelectedVideo} />

      <FeatureHighlights />

      {!isLoggedIn && <CTASection onSignUpClick={() => setIsAuthModalOpen(true)} />}

      {isLoggedIn && <UserDashboard onRecipeClick={setSelectedRecipe} />}

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsLoggedIn(true)}
      />

      <RecipeDetailModal
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        recipe={selectedRecipe || heroRecipe}
        onWatchVideo={setSelectedVideo}
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