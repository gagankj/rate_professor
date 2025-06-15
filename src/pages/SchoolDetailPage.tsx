import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, ExternalLink, ArrowLeft } from 'lucide-react';
import { schools, professors } from '../data/mockData';
import ProfessorCard from '../components/ProfessorCard';
import StarRating from '../components/StarRating';

const SchoolDetailPage: React.FC = () => {
  const { schoolId } = useParams<{ schoolId: string }>();
  
  const school = schools.find(s => s.id === schoolId);
  const schoolProfessors = professors.filter(p => p.schoolId === schoolId);

  if (!school) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">School not found</h2>
          <Link to="/schools" className="text-blue-600 hover:text-blue-800">
            Back to Schools
          </Link>
        </div>
      </div>
    );
  }

  const getSchoolTypeLabel = (type: string) => {
    switch (type) {
      case 'university':
        return 'University';
      case 'college':
        return 'College';
      case 'community-college':
        return 'Community College';
      default:
        return 'School';
    }
  };

  const getSchoolTypeColor = (type: string) => {
    switch (type) {
      case 'university':
        return 'bg-blue-100 text-blue-800';
      case 'college':
        return 'bg-green-100 text-green-800';
      case 'community-college':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/schools"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Schools
        </Link>

        {/* School Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{school.name}</h1>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getSchoolTypeColor(school.type)}`}>
                {getSchoolTypeLabel(school.type)}
              </span>
            </div>
            <StarRating rating={school.averageRating} size="lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{school.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-3">
                <Users className="h-5 w-5 mr-2" />
                <span>{school.professorsCount} professors</span>
              </div>
              {school.website && (
                <a
                  href={school.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </a>
              )}
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed">{school.description}</p>
            </div>
          </div>
        </div>

        {/* Professors Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Professors ({schoolProfessors.length})
            </h2>
          </div>

          {schoolProfessors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schoolProfessors.map(professor => (
                <ProfessorCard key={professor.id} professor={professor} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No professors yet</h3>
              <p className="text-gray-600">
                This school doesn't have any professors listed yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolDetailPage;