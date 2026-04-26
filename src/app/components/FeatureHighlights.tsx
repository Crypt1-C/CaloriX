import { motion } from "motion/react";
import { BookmarkPlus, Users2, TrendingUp, Sparkles } from "lucide-react";

const features = [
  {
    icon: BookmarkPlus,
    title: "Save & Organize",
    description: "Build your personal recipe collection and access it anywhere"
  },
  {
    icon: Sparkles,
    title: "Smart Suggestions",
    description: "Get personalized recipes based on your available ingredients"
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor your cooking journey and nutrition goals"
  },
  {
    icon: Users2,
    title: "Share & Connect",
    description: "Share your creations and discover recipes from the community"
  }
];

export function FeatureHighlights() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-[var(--beige)] mb-4" style={{ fontWeight: 700 }}>
            Why Choose Calorix
          </h2>
          <p className="text-lg text-[var(--muted-foreground)]">
            Your complete cooking companion for a healthier lifestyle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="h-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-2xl p-8 hover:border-[var(--orange)] transition-all">
                <div className="w-16 h-16 rounded-2xl bg-[rgba(255,107,53,0.1)] flex items-center justify-center mb-6 group-hover:bg-[rgba(255,107,53,0.2)] transition-colors">
                  <feature.icon className="w-8 h-8 text-[var(--orange)]" />
                </div>
                <h3 className="text-xl text-[var(--beige)] mb-3" style={{ fontWeight: 600 }}>
                  {feature.title}
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
