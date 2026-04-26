import { motion, useScroll, useTransform } from "motion/react";
import { Clock, Flame, Users, Play } from "lucide-react";
import { useRef } from "react";

export function HeroSection({ onGetRecipe, onWatchVideo }: { onGetRecipe?: () => void; onWatchVideo?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div
        style={{ y }}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1774921677519-e2aeb343e9b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMGRpc2glMjBwbGF0ZWQlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3NjA5MTY3NHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Gourmet dish"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--black)] via-[rgba(10,14,13,0.8)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] via-transparent to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block px-4 py-2 rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] mb-6"
          >
            <span className="text-[var(--orange)] text-sm" style={{ fontWeight: 500 }}>
              Featured Recipe
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-7xl text-[var(--beige)] mb-6 leading-tight"
            style={{ fontWeight: 700 }}
          >
            Truffle Mushroom <br />
            <span className="text-[var(--orange)]">Risotto</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl text-[var(--muted-foreground)] mb-8 max-w-xl"
          >
            Creamy Italian rice with wild mushrooms, parmesan, and aromatic truffle oil
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex items-center gap-8 mb-10"
          >
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] flex items-center justify-center">
                <Flame className="w-6 h-6 text-[var(--orange)]" />
              </div>
              <div>
                <div className="text-2xl text-[var(--beige)]" style={{ fontWeight: 600 }}>
                  380
                </div>
                <div className="text-sm text-[var(--muted-foreground)]">calories</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] flex items-center justify-center">
                <Clock className="w-6 h-6 text-[var(--beige)]" />
              </div>
              <div>
                <div className="text-2xl text-[var(--beige)]" style={{ fontWeight: 600 }}>
                  35
                </div>
                <div className="text-sm text-[var(--muted-foreground)]">minutes</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] flex items-center justify-center">
                <Users className="w-6 h-6 text-[var(--beige)]" />
              </div>
              <div>
                <div className="text-2xl text-[var(--beige)]" style={{ fontWeight: 600 }}>
                  4
                </div>
                <div className="text-sm text-[var(--muted-foreground)]">servings</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetRecipe}
              className="px-8 py-4 bg-[var(--orange)] text-[var(--black)] rounded-full hover:shadow-2xl hover:shadow-[rgba(255,107,53,0.4)] transition-all"
              style={{ fontWeight: 600 }}
            >
              Get Recipe
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onWatchVideo}
              className="px-8 py-4 bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] text-[var(--beige)] rounded-full hover:bg-[rgba(26,58,46,0.4)] transition-all flex items-center gap-2"
              style={{ fontWeight: 600 }}
            >
              <Play className="w-5 h-5" />
              Watch Video
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[var(--muted-foreground)] text-sm"
        >
          <div className="w-6 h-10 border-2 border-[var(--glass-border)] rounded-full mx-auto flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-[var(--orange)] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
