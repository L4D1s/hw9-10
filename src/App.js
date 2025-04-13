import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import AnimalMemoryGame from './components/AnimalMemoryGame/AnimalMemoryGame';
import ScrollToElementExample from './components/ScrollToElementExample/ScrollToElementExample';
import Carousel from './components/Carousel/Carousel';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memory" element={<AnimalMemoryGame />} />
            <Route path="/scroll" element={<ScrollToElementExample />} />
            <Route path="/carousel" element={<Carousel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
