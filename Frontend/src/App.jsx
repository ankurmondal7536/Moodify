import React from 'react';
import Moodify from './components/Moodify';
import './App.css';
import { RouterProvider } from 'react-router';
import { router } from './app.routes';
import { AuthProvider } from './features/auth/auth.context';
import { songContextProvider } from './features/home/song.context';

function App() {
  return (

    <AuthProvider>
      <songContextProvider>
        <RouterProvider router={router} />
      </songContextProvider>
    </AuthProvider>

  )
}

export default App;