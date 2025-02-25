import React from 'react';
import { ArrowRight } from 'lucide-react';

const JobMarket = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Current Job Market Trends
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Stay informed with real-time insights into Canada's job market
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Market Stats Cards */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-900">Tech Sector</h3>
            <p className="mt-2 text-4xl font-bold text-red-600">+15%</p>
            <p className="mt-1 text-sm text-gray-500">Growth in job postings</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-900">Healthcare</h3>
            <p className="mt-2 text-4xl font-bold text-red-600">+12%</p>
            <p className="mt-1 text-sm text-gray-500">Demand increase</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-900">Remote Work</h3>
            <p className="mt-2 text-4xl font-bold text-red-600">30%</p>
            <p className="mt-1 text-sm text-gray-500">Of new positions</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition transform hover:scale-105">
            Explore Roadmap
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobMarket;