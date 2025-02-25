import React from 'react';
import { Briefcase } from 'lucide-react';

const Roadmap = () => {
  const industries = [
    { name: 'Technology', growth: 'High', jobs: '50,000+' },
    { name: 'Healthcare', growth: 'Very High', jobs: '75,000+' },
    { name: 'Finance', growth: 'Moderate', jobs: '30,000+' },
    { name: 'Manufacturing', growth: 'Stable', jobs: '25,000+' },
    { name: 'Education', growth: 'Moderate', jobs: '20,000+' },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Career Roadmap
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Explore top industries and find your perfect career path
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <div key={industry.name} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-center">
                  <Briefcase className="h-8 w-8 text-red-600" />
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">{industry.name}</h3>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Growth Rate: <span className="font-semibold text-gray-900">{industry.growth}</span></p>
                  <p className="text-sm text-gray-500">Available Jobs: <span className="font-semibold text-gray-900">{industry.jobs}</span></p>
                </div>
                <button className="mt-4 w-full bg-white text-red-600 border border-red-600 rounded-md px-4 py-2 hover:bg-red-50 transition">
                  View Opportunities
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;