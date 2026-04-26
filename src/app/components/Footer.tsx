import { motion } from "motion/react";
import { ChefHat, Instagram, Twitter, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-[var(--glass-border)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[var(--orange)] rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-[var(--black)]" />
              </div>
              <span className="text-2xl tracking-tight text-[var(--beige)]" style={{ fontWeight: 600 }}>
                Calorix
              </span>
            </div>
            <p className="text-[var(--muted-foreground)] mb-6">
              Your gateway to delicious, healthy, and creative cooking
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Mail].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="w-10 h-10 rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--orange)] hover:border-[var(--orange)] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[var(--beige)] mb-4" style={{ fontWeight: 600 }}>Explore</h3>
            <ul className="space-y-3">
              {['Recipes', 'Collections', 'Chefs', 'Meal Plans'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-[var(--muted-foreground)] hover:text-[var(--orange)] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--beige)] mb-4" style={{ fontWeight: 600 }}>Categories</h3>
            <ul className="space-y-3">
              {['Breakfast', 'Lunch', 'Dinner', 'Desserts'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-[var(--muted-foreground)] hover:text-[var(--orange)] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--beige)] mb-4" style={{ fontWeight: 600 }}>Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'Privacy', 'Terms'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-[var(--muted-foreground)] hover:text-[var(--orange)] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--glass-border)] text-center text-[var(--muted-foreground)]">
          <p>© 2026 Calorix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
