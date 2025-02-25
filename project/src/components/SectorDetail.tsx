import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, ExternalLink } from 'lucide-react';

interface Job {
  'Name of Job Posting': string;
  'NOC Code': string;
  'Link of Job Information': string;
}

const sectorFileMap: { [key: string]: string } = {
  'tourism-and-culture': 'tourism-culture',
  'technology': 'technology',
  'life-sciences': 'life-sciences',
  'manufacturing': 'manufacturing',
  'financial-services': 'financial-services',
  'agri-food': 'agri-food',
  'information-and-communications-technology-ict': 'technology' // Map ICT to technology jobs
};

const SectorDetail = () => {
  const { sector } = useParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!sector) {
        setError('Sector not found');
        setLoading(false);
        return;
      }

      const fileName = sectorFileMap[sector];
      
      if (!fileName) {
        setError(`No jobs available for ${sector.split('-').join(' ')}`);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/data/jobs/${fileName}.csv`);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs data');
        }
        
        const csvText = await response.text();
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',');
            return headers.reduce((obj: any, header, index) => {
              obj[header] = values[index].replace(/^"|"$/g, '');
              return obj;
            }, {});
          });
        
        setJobs(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load jobs data');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [sector]);

  const filteredJobs = jobs.filter(job => {
    if (!searchTerm) return true;
    return (
      job['Name of Job Posting'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      job['NOC Code'].toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const formatSectorName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[#f9f9f9] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to="/sectors"
              className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Sectors
            </Link>
          </div>
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {error}
            </h2>
            <p className="text-gray-600">
              Please try selecting a different sector.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f9f9f9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/sectors"
            className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Sectors
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {sector ? formatSectorName(sector) : ''} Jobs
        </h1>

        <div className="mb-8">
          <div className="max-w-xl">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Jobs
            </label>
            <input
              type="text"
              id="search"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              placeholder="Search by job title or NOC code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-red-600 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {job['Name of Job Posting']}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  NOC Code: {job['NOC Code']}
                </p>
                <a
                  href={job['Link of Job Information']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
                >
                  View Details
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No jobs found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectorDetail;