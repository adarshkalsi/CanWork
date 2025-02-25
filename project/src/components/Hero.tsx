import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-white to-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center space-y-8">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block mb-4">Now You Can Live Your</span>
            <span className="block text-red-600">Canadian Dream</span>
          </h1>
          <p className="max-w-md mx-auto text-xl text-gray-600 sm:max-w-3xl">
            Navigate the Canadian job market with confidence. Get personalized guidance, industry insights, and the tools you need to succeed in your career journey.
          </p>
          <div className="max-w-md mx-auto sm:flex sm:justify-center mt-12">
            <div className="rounded-md shadow">
              <button 
                onClick={() => navigate('/sectors')}
                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transform transition duration-200 hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;