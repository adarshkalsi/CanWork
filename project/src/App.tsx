import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sectors from './components/Sectors';
import JobSearch from './components/JobSearch';
import SectorDetail from './components/SectorDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/sectors" element={<Sectors />} />
            <Route path="/sectors/:sector" element={<SectorDetail />} />
            <Route path="/job-search" element={<JobSearch />} />
          </Routes>
        </main>
        <footer className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © 2025 CanWork. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;