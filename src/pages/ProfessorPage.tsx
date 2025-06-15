import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, BookOpen, MessageSquare, TrendingUp } from 'lucide-react';
import { professors, reviews, schools } from '../data/mockData';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import { ReviewFormData } from '../types';

const ProfessorPage: React.FC = () => {
  const { professorId } = useParams<{ professorId: string }>();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  
  const professor = professors.find(p => p.id === professorId);
  const professorReviews = reviews.filter(r => r.professorId === professorId);
  const school = schools.find(s => s.id === professor?.schoolId);

  if (!professor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Professor not found</h2>
          <Link to="/schools" className="text-blue-600 hover:text-blue-800">
            Back to Schools
          </Link>
        </div>
      </div>
    );
  }

  const handleReviewSubmit = (reviewData: ReviewFormData) => {
    // In a real app, this would send to an API
    console.log('New review:', reviewData);
    alert('Review submitted successfully!');
  };

  const sortedReviews = [...professorReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const averageDifficulty = professorReviews.length > 0 
    ? professorReviews.reduce((sum, review) => sum + review.difficulty, 0) / professorReviews.length
    : 0;

  const wouldTakeAgainPercentage = professorReviews.length > 0
    ? (professorReviews.filter(r => r.wouldTakeAgain).length / professorReviews.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to={`/schools/${professor.schoolId}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {professor.schoolName}
        </Link>

        {/* Professor Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{professor.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{professor.title}</p>
              <div className="flex items-center space-x-4 mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {professor.department}
                </span>
                <Link
                  to={`/schools/${professor.schoolId}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {professor.schoolName}
                </Link>
              </div>
              {professor.bio && (
                <p className="text-gray-700 leading-relaxed mb-6">{professor.bio}</p>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Subjects Taught</h3>
                <div className="flex flex-wrap gap-2">
                  {professor.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Rating</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {professor.averageRating.toFixed(1)}
                  </div>
                  <StarRating rating={professor.averageRating} size="lg" />
                  <p className="text-gray-600 mt-2">{professor.totalReviews} reviews</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {averageDifficulty.toFixed(1)}
                  </div>
                  <p className="text-sm text-gray-600">Difficulty</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {wouldTakeAgainPercentage.toFixed(0)}%
                  </div>
                  <p className="text-sm text-gray-600">Would take again</p>
                </div>
              </div>

              <button
                onClick={() => setShowReviewForm(true)}
                className="w-full inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Reviews ({professorReviews.length})
            </h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>

          {sortedReviews.length > 0 ? (
            <div className="space-y-6">
              {sortedReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600 mb-4">
                Be the first to review {professor.name}!
              </p>
              <button
                onClick={() => setShowReviewForm(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Write First Review
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          professorName={professor.name}
          onSubmit={handleReviewSubmit}
          onClose={() => setShowReviewForm(false)}
        />
      )}
    </div>
  );
};

export default ProfessorPage;