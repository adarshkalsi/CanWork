import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Microscope, 
  Monitor, 
  Landmark, 
  Wheat, 
  Palmtree,
  Loader2,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SectorData {
  Sector: string;
  'Percentage Growth': string;
  'Expected Growth': string;
  'Focus Areas': string;
}

const provinceData = {
  'Ontario': '/data/ontario.csv',
  'British Columbia': '/data/bc.csv',
  'Alberta': '/data/alberta.csv'
};

const iconMap = {
  'Manufacturing': Building2,
  'Life Sciences': Microscope,
  'Technology': Monitor,
  'Financial Services': Landmark,
  'Agri-Food': Wheat,
  'Tourism': Palmtree
};

const Sectors = () => {
  const [selectedProvince, setSelectedProvince] = useState('Ontario');
  const [sectors, setSectors] = useState<SectorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSector, setExpandedSector] = useState<string | null>(null);

  const fetchSectorData = async (province: string) => {
    setLoading(true);
    try {
      const response = await fetch(provinceData[province as keyof typeof provinceData]);
      const csvText = await response.text();
      
      const lines = csvText.split('\n');
      const headers = lines[0].split(',');
      const data = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',');
          return headers.reduce((obj: any, header, index) => {
            obj[header] = values[index];
            return obj;
          }, {});
        })
        .filter(sector => !sector.Sector.toLowerCase().includes('green economy'));
      
      setSectors(data);
    } catch (error) {
      console.error('Error fetching sector data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectorData(selectedProvince);
  }, [selectedProvince]);

  const getIcon = (sectorName: string) => {
    for (const [key, Icon] of Object.entries(iconMap)) {
      if (sectorName.toLowerCase().includes(key.toLowerCase())) {
        return Icon;
      }
    }
    return Building2;
  };

  const getSectorSlug = (sectorName: string) => {
    return sectorName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <div className="bg-gradient-to-b from-white to-[#f9f9f9] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Current Job Market Trends
          </h1>
          <p className="text-xl text-gray-600">
            Stay informed with real-time insights into Canada's job market
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              Province:
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              {Object.keys(provinceData).map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-red-600 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => {
              const Icon = getIcon(sector.Sector);
              const isExpanded = expandedSector === sector.Sector;
              const sectorSlug = getSectorSlug(sector.Sector);

              return (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-6 transition-all duration-300 ease-in-out border border-gray-100 hover:shadow-lg ${
                    isExpanded ? 'transform scale-105' : ''
                  }`}
                  onMouseEnter={() => setExpandedSector(sector.Sector)}
                  onMouseLeave={() => setExpandedSector(null)}
                >
                  <div className="flex items-center space-x-4 mb-3">
                    <Icon className="h-6 w-6 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {sector.Sector}
                    </h3>
                  </div>
                  <p className="text-red-600 font-medium mb-2">
                    {sector['Percentage Growth']}
                  </p>
                  
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-48' : 'max-h-0'
                  }`}>
                    <p className="text-sm text-gray-600 mb-4">
                      {sector['Expected Growth']}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {sector['Focus Areas'].split(',').map((area, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                        >
                          {area.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/sectors/${sectorSlug}`}
                    className="inline-flex items-center text-sm text-red-600 hover:text-red-700 transition-colors mt-2"
                  >
                    View Jobs
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/job-search"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition"
          >
            Explore Job Search
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sectors;