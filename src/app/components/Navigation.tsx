import { motion } from "motion/react";
import { Search, User, Heart, ChefHat } from "lucide-react";
import { useState } from "react";

export function Navigation({ onAuthClick, isLoggedIn, onLogout }: { onAuthClick: () => void; isLoggedIn?: boolean; onLogout?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[rgba(15,25,20,0.8)] backdrop-blur-xl border-b border-[var(--glass-border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 bg-[var(--orange)] rounded-full flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-[var(--black)]" />
          </div>
          <span className="text-2xl tracking-tight text-[var(--beige)]" style={{ fontWeight: 600 }}>
            Calorix
          </span>
        </motion.div>

        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-[var(--beige)] hover:text-[var(--orange)] transition-colors"
          >
            <Search className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-[var(--beige)] hover:text-[var(--orange)] transition-colors"
          >
            <Heart className="w-5 h-5" />
          </motion.button>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-[var(--orange)] text-[var(--black)] flex items-center justify-center"
                style={{ fontWeight: 600 }}
              >
                <User className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="px-6 py-2 bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] text-[var(--beige)] rounded-full hover:border-[var(--orange)] transition-all"
                style={{ fontWeight: 500 }}
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAuthClick}
              className="px-6 py-2 bg-[var(--orange)] text-[var(--black)] rounded-full hover:shadow-lg hover:shadow-[rgba(255,107,53,0.3)] transition-all"
              style={{ fontWeight: 500 }}
            >
              Sign In
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
