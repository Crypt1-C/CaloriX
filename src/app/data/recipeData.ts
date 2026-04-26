export interface Recipe {
  title: string;
  image: string;
  calories: number;
  time: number;
  rating: number;
  servings?: number;
  videoUrl?: string;
}

export interface VideoTutorial {
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

export const recipes: Recipe[] = [
  {
    title: "Truffle Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1763867641141-50e00520f189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 380,
    time: 35,
    rating: 4.9,
    servings: 4,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "Mediterranean Buddha Bowl",
    image: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 420,
    time: 25,
    rating: 4.8,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "Spicy Ramen Bowl",
    image: "https://images.unsplash.com/photo-1623428188495-89c064ee061a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 520,
    time: 30,
    rating: 4.9,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "Poke Bowl",
    image: "https://images.unsplash.com/photo-1667499823726-f2c6fc321b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 380,
    time: 20,
    rating: 4.7,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "Green Goddess Salad",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 290,
    time: 15,
    rating: 4.6,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1712746784067-e9e1bd86c043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 650,
    time: 25,
    rating: 4.9,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "Seafood Pasta",
    image: "https://images.unsplash.com/photo-1762631178597-847861217da0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    calories: 580,
    time: 35,
    rating: 4.8,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
];

export const videoTutorials: VideoTutorial[] = [
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
