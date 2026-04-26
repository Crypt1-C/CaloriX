import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function CTASection({ onSignUpClick }: { onSignUpClick?: () => void }) {
  return (
    <div className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--dark-green)] to-[rgba(26,58,46,0.5)] border border-[var(--glass-border)] p-12 md:p-16"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--orange)] opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--dark-green)] opacity-20 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl text-[var(--beige)] mb-6"
              style={{ fontWeight: 700 }}
            >
              Ready to Start Cooking?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto"
            >
              Join thousands of food enthusiasts discovering new recipes, tracking nutrition, and sharing their culinary creations
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSignUpClick}
              className="inline-flex items-center gap-3 px-10 py-5 bg-[var(--orange)] text-[var(--black)] rounded-full hover:shadow-2xl hover:shadow-[rgba(255,107,53,0.5)] transition-all"
              style={{ fontWeight: 600, fontSize: '1.125rem' }}
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-[var(--muted-foreground)] text-sm"
            >
              No credit card required • Free forever
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
