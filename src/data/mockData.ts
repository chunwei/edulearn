import {
  User,
  Course,
  Announcement,
  Assignment,
  Message,
  CalendarEvent,
  Exam
} from '../types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'instructor',
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
]

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description:
      'Learn the fundamentals of web development, including HTML, CSS, and JavaScript.',
    instructor: mockUsers[1],
    thumbnail:
      'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
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
          { id: 'm2', title: 'HTML Quiz', type: 'quiz' }
        ],
        isComplete: true
      },
      {
        id: '102',
        title: 'CSS Fundamentals',
        description: 'Learn about CSS selectors and styling',
        duration: '60 min',
        videoUrl: 'https://example.com/video2',
        materials: [
          { id: 'm3', title: 'CSS Reference Guide', type: 'pdf' },
          { id: 'm4', title: 'Styling Exercise', type: 'assignment' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Data Science Foundations',
    description:
      'An introduction to data science concepts, tools, and methodologies.',
    instructor: mockUsers[1],
    thumbnail:
      'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
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
          { id: 'm6', title: 'Python Exercise', type: 'assignment' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Advanced Machine Learning',
    description: 'Dive deep into machine learning algorithms and techniques.',
    instructor: mockUsers[1],
    thumbnail:
      'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '10 weeks',
    enrollmentCount: 42,
    rating: 4.9,
    price: 99.99,
    level: 'advanced',
    category: 'Machine Learning',
    lessons: []
  },
  {
    id: '4',
    title: 'Digital Marketing Essentials',
    description: 'Learn the core principles of digital marketing strategies.',
    instructor: mockUsers[1],
    thumbnail:
      'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: '6 weeks',
    enrollmentCount: 128,
    rating: 4.5,
    price: 39.99,
    level: 'beginner',
    category: 'Marketing',
    lessons: []
  }
]

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Platform Maintenance',
    content:
      'The platform will be undergoing maintenance on Saturday from 2-4 AM EST.',
    date: '2025-01-15T08:00:00Z',
    authorId: '3'
  },
  {
    id: '2',
    title: 'New Course Available',
    content:
      'We just launched a new course: "Advanced Machine Learning". Check it out!',
    date: '2025-01-10T10:30:00Z',
    authorId: '3'
  },
  {
    id: '3',
    title: 'Assignment Deadline Extended',
    content:
      'The deadline for the CSS Fundamentals assignment has been extended to next Friday.',
    date: '2025-01-08T15:45:00Z',
    authorId: '2',
    courseId: '1'
  }
]

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'HTML Project',
    description: 'Create a simple webpage using HTML5 semantic elements.',
    dueDate: '2025-01-20T23:59:59Z',
    courseId: '1',
    points: 100
  },
  {
    id: '2',
    title: 'CSS Styling Challenge',
    description:
      'Style the provided HTML document according to the specifications.',
    dueDate: '2025-01-25T23:59:59Z',
    courseId: '1',
    points: 150
  },
  {
    id: '3',
    title: 'Python Data Analysis',
    description: 'Analyze the provided dataset using Python and pandas.',
    dueDate: '2025-01-30T23:59:59Z',
    courseId: '2',
    points: 200
  }
]

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    content: 'Hi Alice, have you started the HTML project?',
    senderId: '2', // Jane Smith (instructor)
    receiverId: '1', // John Doe (student)
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isRead: false
  },
  {
    id: 'msg-2',
    content: 'Yes, I submitted it yesterday.',
    senderId: '1',
    receiverId: '2',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    isRead: true
  },
  {
    id: 'msg-3',
    content: 'Great! Let me know if you need any help with the CSS part.',
    senderId: '2',
    receiverId: '1',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    isRead: false
  },
  {
    id: 'msg-4',
    content:
      'Can we schedule a quick call to discuss the project requirements?',
    senderId: '1',
    receiverId: '3', // Admin User
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    isRead: true
  }
]

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'event-c1',
    title: 'Live Q&A: Web Dev Intro',
    start:
      new Date(new Date().setDate(new Date().getDate() + 2))
        .toISOString()
        .split('T')[0] + 'T10:00:00', // 2 days from now at 10:00
    end:
      new Date(new Date().setDate(new Date().getDate() + 2))
        .toISOString()
        .split('T')[0] + 'T11:00:00',
    courseId: '1',
    userId: '2', // Jane Smith
    type: 'live-class',
    color: '#3174ad',
    description:
      'Join Jane for a live Q&A for the Intro to Web Development course.'
  },
  {
    id: 'event-c2',
    title: 'Due: HTML Project',
    start: '2025-01-20', // Using the same dueDate as the assignment for consistency
    end: '2025-01-20', // Added end date for allDay event
    allDay: true,
    courseId: '1',
    type: 'assignment-due',
    color: '#ff9f89'
  },
  {
    id: 'event-c3',
    title: 'Study Group: CSS Styling',
    start:
      new Date(new Date().setDate(new Date().getDate() + 4))
        .toISOString()
        .split('T')[0] + 'T14:00:00', // 4 days from now at 14:00
    end:
      new Date(new Date().setDate(new Date().getDate() + 4))
        .toISOString()
        .split('T')[0] + 'T16:00:00',
    userId: '1', // John Doe's personal study session (or could be a group one)
    type: 'study-session',
    color: '#4caf50'
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
]

export const currentUser: User = mockUsers[0]

// 考试模拟数据
export const mockExams: Exam[] = [
  {
    id: 'exam1',
    title: 'Web开发基础期中考试',
    description: '涵盖HTML、CSS和JavaScript基础知识的期中测试',
    courseId: '1', // 对应Web开发入门课程
    startTime: '2025-02-10T09:00:00Z',
    endTime: '2025-02-10T11:00:00Z',
    duration: 120, // 分钟
    totalPoints: 100,
    questions: [
      {
        id: 'q1',
        examId: 'exam1',
        type: 'multiple-choice',
        content: 'HTML5中，哪个标签用于定义文章的主要内容?',
        options: ['<article>', '<section>', '<main>', '<div>'],
        correctAnswer: '<article>',
        points: 10
      },
      {
        id: 'q2',
        examId: 'exam1',
        type: 'multiple-choice',
        content: '以下哪个CSS选择器的优先级最高?',
        options: ['ID选择器', '类选择器', '标签选择器', '属性选择器'],
        correctAnswer: 'ID选择器',
        points: 10
      },
      {
        id: 'q3',
        examId: 'exam1',
        type: 'true-false',
        content: 'JavaScript是一种编译型语言。',
        correctAnswer: 'false',
        points: 10
      },
      {
        id: 'q4',
        examId: 'exam1',
        type: 'short-answer',
        content: '简述CSS盒模型的组成部分。',
        correctAnswer:
          '内容(content)、内边距(padding)、边框(border)和外边距(margin)',
        points: 20
      },
      {
        id: 'q5',
        examId: 'exam1',
        type: 'essay',
        content: '解释响应式设计的概念，并描述实现响应式网页的三种方法。',
        correctAnswer: '参考答案应包含媒体查询、弹性布局和相对单位等概念',
        points: 50
      }
    ]
  },
  {
    id: 'exam2',
    title: '数据科学基础测验',
    description: 'Python和数据分析基础知识测试',
    courseId: '2', // 对应数据科学基础课程
    startTime: '2025-02-15T14:00:00Z',
    endTime: '2025-02-15T15:30:00Z',
    duration: 90, // 分钟
    totalPoints: 100,
    questions: [
      {
        id: 'q1',
        examId: 'exam2',
        type: 'multiple-choice',
        content: '在Python中，哪种数据结构最适合存储键值对?',
        options: ['列表(List)', '元组(Tuple)', '字典(Dictionary)', '集合(Set)'],
        correctAnswer: '字典(Dictionary)',
        points: 20
      },
      {
        id: 'q2',
        examId: 'exam2',
        type: 'multiple-choice',
        content: '以下哪个库不是Python数据分析常用库?',
        options: ['NumPy', 'Pandas', 'Matplotlib', 'BeautifulSoup'],
        correctAnswer: 'BeautifulSoup',
        points: 20
      },
      {
        id: 'q3',
        examId: 'exam2',
        type: 'true-false',
        content: 'Pandas的DataFrame可以存储不同类型的数据。',
        correctAnswer: 'true',
        points: 20
      },
      {
        id: 'q4',
        examId: 'exam2',
        type: 'short-answer',
        content: '简述数据清洗的重要性和常见步骤。',
        correctAnswer:
          '数据清洗确保数据质量，常见步骤包括处理缺失值、异常值检测与处理、数据格式化等',
        points: 40
      }
    ]
  }
]

// 考试结果模拟数据
export const mockExamResults = [
  {
    id: 'result1',
    examId: 'exam1',
    studentId: '1', // John Doe
    submissionTime: '2025-02-10T10:45:00Z',
    score: 85,
    answers: {
      q1: '<article>',
      q2: 'ID选择器',
      q3: 'false',
      q4: '内容、内边距、边框和外边距组成了CSS盒模型',
      q5: '响应式设计是一种让网页在不同设备上都能良好显示的设计方法。实现方法包括：1. 使用媒体查询(@media)根据屏幕尺寸应用不同样式；2. 使用弹性布局(如Flexbox或Grid)；3. 使用相对单位(如%、em、rem)而非固定像素值。'
    },
    feedback: {
      q4: '答案基本正确，但缺少了对各部分作用的详细说明',
      q5: '回答全面，很好地解释了响应式设计的概念和实现方法'
    }
  }
]
