import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageSquare } from 'lucide-react';
import { Professor } from '../types';
import StarRating from './StarRating';

interface ProfessorCardProps {
  professor: Professor;
}

const ProfessorCard: React.FC<ProfessorCardProps> = ({ professor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              <Link
                to={`/professor/${professor.id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {professor.name}
              </Link>
            </h3>
            <p className="text-gray-600 text-sm">{professor.title}</p>
          </div>
          <StarRating rating={professor.averageRating} size="sm" />
        </div>

        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {professor.department}
          </span>
        </div>

        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{professor.totalReviews} reviews</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {professor.subjects.slice(0, 3).map((subject, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {subject}
              </span>
            ))}
            {professor.subjects.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                +{professor.subjects.length - 3} more
              </span>
            )}
          </div>
        </div>

        <Link
          to={`/professor/${professor.id}`}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfessorCard;