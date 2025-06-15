import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ReviewFormData } from '../types';
import StarRating from './StarRating';

interface ReviewFormProps {
  professorName: string;
  onSubmit: (reviewData: ReviewFormData) => void;
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ professorName, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    studentName: '',
    rating: 0,
    subject: '',
    difficulty: 0,
    wouldTakeAgain: false,
    comment: '',
    tags: [],
  });

  const availableTags = [
    'Clear Explanations',
    'Helpful',
    'Fair Grading',
    'Good Teaching',
    'Office Hours',
    'Difficult Exams',
    'Hard to Follow',
    'Approachable',
    'Engaging',
    'Good Feedback',
    'Supportive',
    'Organized',
    'Knowledgeable',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0 || formData.difficulty === 0) {
      alert('Please provide ratings for both overall rating and difficulty.');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Rate {professorName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.studentName}
                onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overall Rating *
              </label>
              <StarRating
                rating={formData.rating}
                interactive
                onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
                size="lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject/Course
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Calculus I, Psychology 101"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level *
              </label>
              <StarRating
                rating={formData.difficulty}
                interactive
                onRatingChange={(difficulty) => setFormData(prev => ({ ...prev, difficulty }))}
                size="lg"
              />
              <p className="text-sm text-gray-500 mt-1">1 = Very Easy, 5 = Very Hard</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Would you take this professor again?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="wouldTakeAgain"
                    checked={formData.wouldTakeAgain === true}
                    onChange={() => setFormData(prev => ({ ...prev, wouldTakeAgain: true }))}
                    className="mr-2 text-blue-600"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="wouldTakeAgain"
                    checked={formData.wouldTakeAgain === false}
                    onChange={() => setFormData(prev => ({ ...prev, wouldTakeAgain: false }))}
                    className="mr-2 text-blue-600"
                  />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                required
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your experience with this professor..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.tags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;