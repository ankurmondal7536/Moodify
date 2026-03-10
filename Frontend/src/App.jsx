import React from 'react';
import Moodify from './features/expression/components/Moodify';
import './App.css';
import { RouterProvider } from 'react-router';
import { router } from './app.routes';
import { AuthProvider } from './features/auth/auth.context';
import { SongContextProvider } from './features/home/song.context';

function App() {
  return (

    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>

  )
}

export default App;