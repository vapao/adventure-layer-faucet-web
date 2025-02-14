import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeIndex from './Home';
import MobileIndex from './mobile/index';

// Regular expression to check if the user is on a mobile device
export const isMobile = /Android|iPhone/i.test(navigator.userAgent)


const App = () => {
  // return (
  return isMobile ? <MobileIndex /> : (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<HomeIndex />} />
        </Routes>
      </header>
    </div>
  );
};

export default App;