import React from 'react';
import Moodify from './components/Moodify';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Moodify AI</h1>
        <p>Express yourself and let the AI guess!</p>
      </header>
      <main>
        <Moodify />
      </main>
    </div>
  );
}

export default App;