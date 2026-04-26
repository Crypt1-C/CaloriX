import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function WelcomeBanner({ show, userName = "Chef" }: { show: boolean; userName?: string }) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-40"
        >
          <div className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--orange)] rounded-2xl shadow-2xl shadow-[rgba(255,107,53,0.3)] overflow-hidden">
            <div className="relative p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[rgba(255,107,53,0.2)] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[var(--orange)]" />
              </div>
              <div>
                <h3 className="text-xl text-[var(--beige)] mb-1" style={{ fontWeight: 600 }}>
                  Welcome back, {userName}!
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Your personalized kitchen awaits
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVisible(false)}
                className="ml-4 text-[var(--muted-foreground)] hover:text-[var(--orange)] transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
