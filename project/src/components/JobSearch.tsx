import React, { useState, useEffect } from 'react';
import { Briefcase, ExternalLink, Loader2 } from 'lucide-react';

interface Job {
  'Name of Job Posting': string;
  'NOC Code': string;
  'Link of Job Information': string;
}

const JobSearch = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const sectors = [
    { id: 'all', name: 'All Sectors' },
    { id: 'technology', name: 'Technology' },
    { id: 'life-sciences', name: 'Life Sciences' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'financial-services', name: 'Financial Services' },
    { id: 'agri-food', name: 'Agri-Food' },
    { id: 'tourism-culture', name: 'Tourism & Culture' }
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const sectorFiles = [
          'technology',
          'life-sciences',
          'manufacturing',
          'financial-services',
          'agri-food',
          'tourism-culture'
        ];

        const allJobs: Job[] = [];

        for (const file of sectorFiles) {
          const response = await fetch(`/data/jobs/${file}.csv`);
          const csvText = await response.text();
          const lines = csvText.split('\n');
          const headers = lines[0].split(',');
          
          const sectorJobs = lines
            .slice(1)
            .filter(line => line.trim())
            .map(line => {
              const values = line.split(',');
              return headers.reduce((obj: any, header, index) => {
                obj[header] = values[index].replace(/^"|"$/g, '');
                return obj;
              }, {});
            });
          
          allJobs.push(...sectorJobs);
        }

        setJobs(allJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job['Name of Job Posting'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      job['NOC Code'].toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedSector === 'all') return matchesSearch;

    // Map job to sector based on patterns in job titles
    const jobSector = 
      job['Name of Job Posting'].toLowerCase().includes('tech') ? 'technology' :
      job['Name of Job Posting'].toLowerCase().includes('bio') || 
      job['Name of Job Posting'].toLowerCase().includes('medical') ? 'life-sciences' :
      job['Name of Job Posting'].toLowerCase().includes('manufacturing') || 
      job['Name of Job Posting'].toLowerCase().includes('engineer') ? 'manufacturing' :
      job['Name of Job Posting'].toLowerCase().includes('financial') || 
      job['Name of Job Posting'].toLowerCase().includes('investment') ? 'financial-services' :
      job['Name of Job Posting'].toLowerCase().includes('agri') || 
      job['Name of Job Posting'].toLowerCase().includes('food') ? 'agri-food' :
      job['Name of Job Posting'].toLowerCase().includes('tourism') || 
      job['Name of Job Posting'].toLowerCase().includes('hotel') ? 'tourism-culture' : 'other';

    return matchesSearch && jobSector === selectedSector;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f9f9f9] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Available Jobs in Canada
          </h1>
          <p className="text-xl text-gray-600">
            Explore current job opportunities across different sectors
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by job title or NOC code..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
            >
              {sectors.map(sector => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-lg ${
                  expandedJob === job['Name of Job Posting'] ? 'transform scale-105' : ''
                }`}
                onMouseEnter={() => setExpandedJob(job['Name of Job Posting'])}
                onMouseLeave={() => setExpandedJob(null)}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Briefcase className="h-6 w-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {job['Name of Job Posting']}
                  </h3>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    NOC Code: <span className="font-semibold">{job['NOC Code']}</span>
                  </p>
                </div>

                <div className={`transition-all duration-300 ${
                  expandedJob === job['Name of Job Posting'] ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
                } overflow-hidden`}>
                  <p className="text-sm text-gray-600 mb-4">
                    Click below to view detailed job information, requirements, and application process.
                  </p>
                </div>

                <a
                  href={job['Link of Job Information']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
                >
                  View Details
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No jobs found matching your search criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearch;