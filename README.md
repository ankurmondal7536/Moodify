# 🎵 Moodify

**Moodify** is an innovative mood-based music streaming application that detects your facial expressions in real-time and recommends songs matching your current mood. Express yourself through your face, and let the music follow your emotions!

## ✨ Features

- **Facial Expression Recognition**: Real-time mood detection using facial blendshapes (facial landmarks)
- **Mood-Based Music Recommendations**: Automatically suggests songs based on detected mood
- **User Authentication**: Secure login and registration system with JWT tokens
- **Music Player**: Full-featured music player with mood-specific playlists
- **Song Management**: Browse, search, and manage your music library
- **User Profiles**: Personalized user experience with stored preferences
- **Responsive Design**: Works seamlessly on desktop and tablet devices

## 🎯 Supported Moods

- 😊 **Happy** - Upbeat and energetic tracks
- 😢 **Sad** - Emotional and introspective songs
- 😠 **Angry** - Intense and powerful music
- 😲 **Surprised** - Unexpected and exciting tunes
- 😑 **Annoyed** - Chill and ambient sounds

## 🏗️ Project Structure

```
Moodify/
├── Backend/                 # Express.js REST API
│   ├── src/
│   │   ├── config/         # Database & cache configuration
│   │   ├── controller/     # Request handlers
│   │   ├── middlewares/    # Authentication & file upload
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic & storage
│   │   └── app.js          # Express app setup
│   ├── server.js           # Entry point
│   └── package.json
│
└── Frontend/                # React + Vite SPA
    ├── src/
    │   ├── features/
    │   │   ├── auth/       # Authentication & login
    │   │   ├── expression/ # Mood detection & analysis
    │   │   ├── home/       # Music player & library
    │   │   └── shared/     # Shared components & styles
    │   ├── App.jsx         # Main component
    │   ├── main.jsx        # React entry point
    │   └── app.routes.jsx  # Route configuration
    ├── vite.config.js
    └── package.json
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ORM)
- **Caching**: Redis (ioredis)
- **Authentication**: JWT tokens with bcryptjs
- **File Upload**: Multer
- **File Storage**: ImageKit
- **Music Metadata**: node-id3

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: SCSS/CSS
- **Routing**: React Router
- **State Management**: Context API
- **Face Detection**: MediaPipe (via blendshapes)
- **HTTP Client**: Axios

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)
- Redis instance (optional, for caching)
- ImageKit account (for image storage)

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
REDIS_URL=your_redis_url
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

4. Start the development server:
```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Songs
- `GET /api/songs` - Get all songs
- `POST /api/songs` - Add a new song
- `GET /api/songs/:id` - Get song details
- `DELETE /api/songs/:id` - Delete a song
- `GET /api/songs/mood/:mood` - Get songs by mood

## 🎨 How It Works

1. **User Login**: Authenticate using credentials
2. **Activate Camera**: Grant camera permissions for facial recognition
3. **Face Detection**: The app uses MediaPipe to detect facial landmarks
4. **Mood Analysis**: Blendshape scores are analyzed to determine current mood
5. **Music Recommendation**: Based on detected mood, the app suggests and plays appropriate songs
6. **Music Playback**: Enjoy your mood-matched music with full player controls

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected routes for authenticated users
- CORS configuration for secure cross-origin requests
- Secure token storage in HTTP-only cookies

## 📦 Dependencies

See `Backend/package.json` and `Frontend/package.json` for complete dependency lists.

## 🐛 Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check if port 5000 is available
- Verify all environment variables are set

### Frontend won't connect to Backend
- Check if backend server is running
- Verify `VITE_API_URL` in `.env` file
- Ensure CORS is properly configured

### Facial Recognition not working
- Grant camera permissions to the browser
- Ensure good lighting conditions
- Check if your browser supports MediaPipe

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created with ❤️ for music lovers and emotion enthusiasts.

---

**Enjoy Moodify and let your emotions guide your music! 🎵😊**
