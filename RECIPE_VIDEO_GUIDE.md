# Calorix - Recipe & Video Management Guide

## Overview
This guide explains how to manage recipes and video URLs in your Calorix recipe website.

## Managing Video URLs

### Where Videos Are Stored
All recipe and video data can be managed in `/src/app/data/recipeData.ts`

### Supported Video Platforms
The VideoModal component automatically handles:
- **YouTube**: `https://www.youtube.com/watch?v=VIDEO_ID` or `https://youtu.be/VIDEO_ID`
- **Vimeo**: `https://vimeo.com/VIDEO_ID`
- **Direct URLs**: Any direct video URL

### How to Update Video URLs

#### 1. For Recipe Videos
Edit the recipe object in `recipeData.ts`:
```typescript
{
  title: "Truffle Mushroom Risotto",
  image: "...",
  calories: 380,
  time: 35,
  rating: 4.9,
  servings: 4,
  videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID" // Add or update this
}
```

#### 2. For Tutorial Videos (Watch & Cook Section)
Edit the videoTutorials array:
```typescript
{
  title: "Perfect Pasta Technique",
  duration: "8:32",
  thumbnail: "...",
  videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
}
```

#### 3. For Hero Section Video
Update in `App.tsx`:
```typescript
const heroVideo = {
  title: "How to Make Truffle Mushroom Risotto",
  videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
};
```

## Best Practices

### Video URLs
1. **Use YouTube or Vimeo** for best performance and reliability
2. **Test videos** before deployment to ensure they load correctly
3. **Keep URLs updated** - if a video is removed from the platform, update the URL
4. **Use high-quality videos** that are clear and well-produced

### Database Integration (Future)
For production, consider storing video URLs in:
- **MongoDB/PostgreSQL**: Store URLs with recipe data
- **CMS (Strapi/Contentful)**: Manage content through admin panel
- **JSON API**: Fetch from external data source

Example database schema:
```json
{
  "id": 1,
  "title": "Truffle Mushroom Risotto",
  "calories": 380,
  "time": 35,
  "rating": 4.9,
  "servings": 4,
  "imageUrl": "...",
  "videoUrl": "https://www.youtube.com/watch?v=...",
  "createdAt": "2026-04-23",
  "updatedAt": "2026-04-23"
}
```

## Video Modal Features

### Current Implementation
- **Auto-play**: Videos start automatically when modal opens
- **Responsive**: Works on desktop and mobile
- **Embed optimization**: Converts regular URLs to embed URLs
- **Smooth animations**: Modal enters/exits with spring animation

### User Experience Flow
1. User clicks "Watch Video" button
2. Modal opens with smooth animation
3. Video auto-plays in embedded player
4. User can close modal with X button or backdrop click
5. Video stops when modal closes

## Testing Videos

### How to Test
1. Click any "Watch Video" button
2. Verify video loads and plays
3. Check on different devices (desktop, tablet, mobile)
4. Ensure close button works
5. Test with different video platforms (YouTube, Vimeo)

### Troubleshooting
- **Video not loading**: Check if URL is correct and publicly accessible
- **Autoplay not working**: Some browsers block autoplay - this is normal
- **Video blocked**: Ensure video allows embedding (check YouTube/Vimeo settings)

## Adding New Recipes with Videos

1. Add recipe to `recipeData.ts`:
```typescript
export const recipes: Recipe[] = [
  // ... existing recipes
  {
    title: "New Amazing Recipe",
    image: "URL_TO_IMAGE",
    calories: 450,
    time: 30,
    rating: 4.7,
    servings: 2,
    videoUrl: "https://www.youtube.com/watch?v=NEW_VIDEO_ID"
  }
];
```

2. Recipe automatically appears in:
   - Popular Recipes carousel (if added to PopularRecipes component)
   - User Dashboard favorites (if added to favoriteRecipes)
   - Search results (when search functionality is implemented)

## Component Architecture

### Video Flow
```
User Action (Click "Watch Video")
    ↓
Parent Component (App.tsx, HeroSection, etc.)
    ↓
setSelectedVideo({ title, videoUrl })
    ↓
VideoModal Component
    ↓
Convert URL to embed format
    ↓
Display in iframe with autoplay
```

### Recipe Video Integration Points
1. **Hero Section**: Main featured recipe video
2. **Recipe Detail Modal**: Each recipe can have its own video
3. **Watch & Cook Section**: Tutorial videos
4. **User Dashboard**: Favorite recipe videos

## Future Enhancements

### Suggested Features
- [ ] Video playlists for multi-step recipes
- [ ] Video chapters/timestamps
- [ ] Picture-in-Picture mode
- [ ] Video download options
- [ ] Subtitle support
- [ ] Video quality selection
- [ ] Watch history tracking
- [ ] Video recommendations based on watched content

### Backend Integration
```typescript
// Example API endpoint
GET /api/recipes/:id
{
  "recipe": {
    "id": 1,
    "title": "...",
    "videoUrl": "...",
    "videoThumbnail": "...",
    "videoDuration": 480 // seconds
  }
}

// Update video URL
PATCH /api/recipes/:id
{
  "videoUrl": "https://new-url.com"
}
```

## Notes
- All video URLs in the current demo use placeholder YouTube URLs
- Replace with actual cooking tutorial URLs for production
- Ensure you have rights to use/embed the videos
- Consider hosting own videos for better control and no ads
