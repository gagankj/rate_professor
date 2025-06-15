import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, ExternalLink } from 'lucide-react';
import { School } from '../types';
import StarRating from './StarRating';

interface SchoolCardProps {
  school: School;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
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
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              <Link
                to={`/schools/${school.id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {school.name}
              </Link>
            </h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSchoolTypeColor(school.type)}`}>
              {getSchoolTypeLabel(school.type)}
            </span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{school.location}</span>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {school.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-sm">{school.professorsCount} professors</span>
            </div>
          </div>
          <StarRating rating={school.averageRating} size="sm" />
        </div>

        <div className="flex items-center justify-between">
          <Link
            to={`/schools/${school.id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            View Professors
          </Link>
          {school.website && (
            <a
              href={school.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;