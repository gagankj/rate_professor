export interface School {
  id: string;
  name: string;
  type: 'university' | 'college' | 'community-college';
  location: string;
  description: string;
  website?: string;
  professorsCount: number;
  averageRating: number;
  logo?: string;
}

export interface Professor {
  id: string;
  name: string;
  department: string;
  schoolId: string;
  schoolName: string;
  title: string;
  averageRating: number;
  totalReviews: number;
  subjects: string[];
  bio?: string;
}

export interface Review {
  id: string;
  professorId: string;
  studentName: string;
  rating: number;
  subject: string;
  difficulty: number;
  wouldTakeAgain: boolean;
  comment: string;
  date: string;
  helpful: number;
  tags: string[];
}

export interface ReviewFormData {
  studentName: string;
  rating: number;
  subject: string;
  difficulty: number;
  wouldTakeAgain: boolean;
  comment: string;
  tags: string[];
}