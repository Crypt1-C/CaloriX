import { motion } from "motion/react";
import { Play } from "lucide-react";

const videos = [
  {
    title: "Perfect Pasta Technique",
    duration: "8:32",
    thumbnail: "https://images.unsplash.com/photo-1712746784296-e62c1cc7b1f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "Plating Like a Pro",
    duration: "6:15",
    thumbnail: "https://images.unsplash.com/photo-1763867641077-d672d26f2ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "Knife Skills Masterclass",
    duration: "12:45",
    thumbnail: "https://images.unsplash.com/photo-1774921677530-9031f1ea00ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "Sauce Fundamentals",
    duration: "10:20",
    thumbnail: "https://images.unsplash.com/photo-1763867641141-50e00520f189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
];

export function WatchAndCook({ onVideoClick }: { onVideoClick?: (video: { title: string; videoUrl: string }) => void }) {
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
            Watch & Cook
          </h2>
          <p className="text-lg text-[var(--muted-foreground)]">
            Master cooking techniques with our video tutorials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => onVideoClick?.(video)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)]">
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] via-transparent to-transparent opacity-60" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-16 h-16 rounded-full bg-[var(--orange)] flex items-center justify-center shadow-2xl"
                    >
                      <Play className="w-8 h-8 text-[var(--black)] ml-1" />
                    </motion.div>
                  </div>

                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-[rgba(0,0,0,0.8)] backdrop-blur-md rounded-full text-xs text-[var(--beige)]">
                    {video.duration}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-base text-[var(--beige)] group-hover:text-[var(--orange)] transition-colors" style={{ fontWeight: 600 }}>
                    {video.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
