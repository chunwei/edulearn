import { User, Course, Announcement, Assignment, Message, CalendarEvent } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'instructor',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development, including HTML, CSS, and JavaScript.',
    instructor: mockUsers[1],
    thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '8 weeks',
    enrollmentCount: 156,
    rating: 4.8,
    price: 49.99,
    level: 'beginner',
    category: 'Web Development',
    lessons: [
      {
        id: '101',
        title: 'HTML Basics',
        description: 'Introduction to HTML tags and document structure',
        duration: '45 min',
        videoUrl: 'https://example.com/video1',
        materials: [
          { id: 'm1', title: 'HTML Cheatsheet', type: 'pdf' },
          { id: 'm2', title: 'HTML Quiz', type: 'quiz' },
        ],
        isComplete: true,
      },
      {
        id: '102',
        title: 'CSS Fundamentals',
        description: 'Learn about CSS selectors and styling',
        duration: '60 min',
        videoUrl: 'https://example.com/video2',
        materials: [
          { id: 'm3', title: 'CSS Reference Guide', type: 'pdf' },
          { id: 'm4', title: 'Styling Exercise', type: 'assignment' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Data Science Foundations',
    description: 'An introduction to data science concepts, tools, and methodologies.',
    instructor: mockUsers[1],
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '12 weeks',
    enrollmentCount: 89,
    rating: 4.6,
    price: 69.99,
    level: 'intermediate',
    category: 'Data Science',
    lessons: [
      {
        id: '201',
        title: 'Introduction to Python',
        description: 'Getting started with Python for data analysis',
        duration: '55 min',
        materials: [
          { id: 'm5', title: 'Python Basics', type: 'pdf' },
          { id: 'm6', title: 'Python Exercise', type: 'assignment' },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Advanced Machine Learning',
    description: 'Dive deep into machine learning algorithms and techniques.',
    instructor: mockUsers[1],
    thumbnail: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '10 weeks',
    enrollmentCount: 42,
    rating: 4.9,
    price: 99.99,
    level: 'advanced',
    category: 'Machine Learning',
    lessons: [],
  },
  {
    id: '4',
    title: 'Digital Marketing Essentials',
    description: 'Learn the core principles of digital marketing strategies.',
    instructor: mockUsers[1],
    thumbnail: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '6 weeks',
    enrollmentCount: 128,
    rating: 4.5,
    price: 39.99,
    level: 'beginner',
    category: 'Marketing',
    lessons: [],
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Platform Maintenance',
    content: 'The platform will be undergoing maintenance on Saturday from 2-4 AM EST.',
    date: '2025-01-15T08:00:00Z',
    authorId: '3',
  },
  {
    id: '2',
    title: 'New Course Available',
    content: 'We just launched a new course: "Advanced Machine Learning". Check it out!',
    date: '2025-01-10T10:30:00Z',
    authorId: '3',
  },
  {
    id: '3',
    title: 'Assignment Deadline Extended',
    content: 'The deadline for the CSS Fundamentals assignment has been extended to next Friday.',
    date: '2025-01-08T15:45:00Z',
    authorId: '2',
    courseId: '1',
  },
];

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'HTML Project',
    description: 'Create a simple webpage using HTML5 semantic elements.',
    dueDate: '2025-01-20T23:59:59Z',
    courseId: '1',
    points: 100,
  },
  {
    id: '2',
    title: 'CSS Styling Challenge',
    description: 'Style the provided HTML document according to the specifications.',
    dueDate: '2025-01-25T23:59:59Z',
    courseId: '1',
    points: 150,
  },
  {
    id: '3',
    title: 'Python Data Analysis',
    description: 'Analyze the provided dataset using Python and pandas.',
    dueDate: '2025-01-30T23:59:59Z',
    courseId: '2',
    points: 200,
  },
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    content: 'Hi Alice, have you started the HTML project?',
    senderId: '2', // Jane Smith (instructor)
    receiverId: '1', // John Doe (student)
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isRead: false,
  },
  {
    id: 'msg-2',
    content: 'Yes, I submitted it yesterday.',
    senderId: '1',
    receiverId: '2',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    isRead: true,
  },
  {
    id: 'msg-3',
    content: 'Great! Let me know if you need any help with the CSS part.',
    senderId: '2',
    receiverId: '1',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    isRead: false,
  },
  {
    id: 'msg-4',
    content: 'Can we schedule a quick call to discuss the project requirements?',
    senderId: '1', 
    receiverId: '3', // Admin User
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    isRead: true,
  },
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'event-c1',
    title: 'Live Q&A: Web Dev Intro',
    start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0] + 'T10:00:00', // 2 days from now at 10:00
    end: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0] + 'T11:00:00',
    courseId: '1',
    userId: '2', // Jane Smith
    type: 'live-class',
    color: '#3174ad',
    description: 'Join Jane for a live Q&A for the Intro to Web Development course.'
  },
  {
    id: 'event-c2',
    title: 'Due: HTML Project',
    start: '2025-01-20', // Using the same dueDate as the assignment for consistency
    end: '2025-01-20', // Added end date for allDay event
    allDay: true,
    courseId: '1',
    type: 'assignment-due',
    color: '#ff9f89',
  },
  {
    id: 'event-c3',
    title: 'Study Group: CSS Styling',
    start: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString().split('T')[0] + 'T14:00:00', // 4 days from now at 14:00
    end: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString().split('T')[0] + 'T16:00:00',
    userId: '1', // John Doe's personal study session (or could be a group one)
    type: 'study-session',
    color: '#4caf50',
  },
  {
    id: 'event-c4',
    title: 'Platform Maintenance',
    start: '2025-01-15T02:00:00Z',
    end: '2025-01-15T04:00:00Z',
    type: 'holiday', // Or a custom 'maintenance' type if added to CalendarEvent
    description: 'Platform will be offline for scheduled maintenance.',
    color: '#757575'
  }
];

export const currentUser: User = mockUsers[0];