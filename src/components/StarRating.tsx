import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating)].map((_, index) => {
        const starRating = index + 1;
        const isFilled = starRating <= rating;
        const isPartial = starRating > rating && starRating - 1 < rating;
        
        return (
          <button
            key={index}
            type={interactive ? 'button' : undefined}
            onClick={() => handleStarClick(starRating)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`${sizeClasses[size]} ${
                isFilled
                  ? 'text-yellow-400 fill-yellow-400'
                  : isPartial
                  ? 'text-yellow-400 fill-yellow-200'
                  : 'text-gray-300'
              }`}
            />
          </button>
        );
      })}
      <span className="ml-2 text-sm text-gray-600 font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default StarRating;