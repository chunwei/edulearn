export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  instructor: User;
  thumbnail: string;
  duration: string;
  enrollmentCount: number;
  rating: number;
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  materials: Material[];
  isComplete?: boolean;
};

export type Material = {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'assignment' | 'quiz';
  url?: string;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  authorId: string;
  courseId?: string;
};

export type Message = {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
  isRead: boolean;
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  courseId: string;
  points: number;
  submissions?: Submission[];
};

export type Submission = {
  id: string;
  studentId: string;
  assignmentId: string;
  submissionDate: string;
  content: string;
  score?: number;
  feedback?: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  start: string; // ISO date string or YYYY-MM-DD
  end: string;   // ISO date string or YYYY-MM-DD
  allDay?: boolean;
  description?: string;
  courseId?: string; // Link to a course
  userId?: string;   // Link to a user (e.g., instructor for live class, or student for personal event)
  type: 'live-class' | 'assignment-due' | 'study-session' | 'personal' | 'exam' | 'holiday';
  color?: string; // Optional color for the event on the calendar
};