import React from 'react';
import { ThumbsUp, Calendar } from 'lucide-react';
import { Review } from '../types';
import StarRating from './StarRating';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return { label: 'Easy', color: 'text-green-600' };
    if (difficulty <= 3) return { label: 'Moderate', color: 'text-yellow-600' };
    return { label: 'Hard', color: 'text-red-600' };
  };

  const difficultyInfo = getDifficultyLabel(review.difficulty);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-4 mb-2">
            <span className="font-medium text-gray-900">{review.studentName}</span>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(review.date)}
            </div>
          </div>
          <StarRating rating={review.rating} size="sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Subject</div>
          <div className="font-medium text-gray-900">{review.subject}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Difficulty</div>
          <div className={`font-medium ${difficultyInfo.color}`}>
            {difficultyInfo.label} ({review.difficulty}/5)
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Would Take Again</div>
          <div className={`font-medium ${review.wouldTakeAgain ? 'text-green-600' : 'text-red-600'}`}>
            {review.wouldTakeAgain ? 'Yes' : 'No'}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      </div>

      {review.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {review.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
          <ThumbsUp className="h-4 w-4" />
          <span className="text-sm">Helpful ({review.helpful})</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;