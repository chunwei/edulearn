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

// 考试相关
export type Exam = {
  id: string;
  title: string;
  description: string;
  courseId: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalPoints: number;
  questions: Question[];
};

export type Question = {
  id: string;
  examId: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  content: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
};

// 费用相关
export type Fee = {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  category: 'tuition' | 'library' | 'laboratory' | 'transportation' | 'other';
  studentId?: string;
  courseId?: string;
};

export type Payment = {
  id: string;
  feeId: string;
  studentId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'credit-card' | 'bank-transfer' | 'cash' | 'other';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
};

// 考勤相关
export type Attendance = {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
};

export type LeaveRequest = {
  id: string;
  studentId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  notes?: string;
};

// ID卡相关
export type IDCard = {
  id: string;
  userId: string;
  issueDate: string;
  expiryDate: string;
  cardNumber: string;
  templateId: string;
  status: 'active' | 'expired' | 'lost';
};

// 时间表相关
export type TimeTable = {
  id: string;
  name: string;
  academicYear: string;
  semester: string;
  startDate: string;
  endDate: string;
  slots: TimeSlot[];
};

export type TimeSlot = {
  id: string;
  timeTableId: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
  courseId: string;
  instructorId: string;
  roomId: string;
};

// 假期相关
export type Holiday = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
  type: 'public' | 'school' | 'religious' | 'other';
};