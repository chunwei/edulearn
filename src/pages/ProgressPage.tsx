import {
  ArrowUpIcon,
  BookOpenIcon,
  CheckCircleIcon,
  CircleIcon,
  UsersIcon
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export const metadata = {
  title: 'Progress | Digital Chalk LMS',
  description: 'Track learner progress across all courses'
}

// Sample user progress data
const learnerProgress = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    enrolledCourses: 4,
    completedCourses: 2,
    avgProgress: 68,
    lastActive: '2 hours ago',
    courses: [
      {
        name: 'Introduction to Machine Learning',
        progress: 100,
        status: 'Completed'
      },
      { name: 'Web Development Bootcamp', progress: 85, status: 'In Progress' },
      {
        name: 'Digital Marketing Fundamentals',
        progress: 62,
        status: 'In Progress'
      },
      {
        name: 'Project Management Professional',
        progress: 25,
        status: 'In Progress'
      }
    ]
  },
  {
    id: 2,
    name: 'Michael Brown',
    email: 'mbrown@example.com',
    enrolledCourses: 3,
    completedCourses: 1,
    avgProgress: 52,
    lastActive: '5 hours ago',
    courses: [
      { name: 'Web Development Bootcamp', progress: 100, status: 'Completed' },
      { name: 'UX/UI Design Principles', progress: 35, status: 'In Progress' },
      {
        name: 'Introduction to Machine Learning',
        progress: 20,
        status: 'In Progress'
      }
    ]
  },
  {
    id: 3,
    name: 'Jessica Williams',
    email: 'jwilliams@example.com',
    enrolledCourses: 5,
    completedCourses: 3,
    avgProgress: 82,
    lastActive: '1 day ago',
    courses: [
      {
        name: 'Project Management Professional',
        progress: 100,
        status: 'Completed'
      },
      {
        name: 'Digital Marketing Fundamentals',
        progress: 100,
        status: 'Completed'
      },
      { name: 'Advanced Data Science', progress: 100, status: 'Completed' },
      { name: 'Web Development Bootcamp', progress: 65, status: 'In Progress' },
      { name: 'UX/UI Design Principles', progress: 45, status: 'In Progress' }
    ]
  },
  {
    id: 4,
    name: 'David Miller',
    email: 'dmiller@example.com',
    enrolledCourses: 2,
    completedCourses: 0,
    avgProgress: 38,
    lastActive: '2 days ago',
    courses: [
      {
        name: 'Introduction to Machine Learning',
        progress: 45,
        status: 'In Progress'
      },
      {
        name: 'Digital Marketing Fundamentals',
        progress: 30,
        status: 'In Progress'
      }
    ]
  },
  {
    id: 5,
    name: 'Emily Davis',
    email: 'edavis@example.com',
    enrolledCourses: 3,
    completedCourses: 1,
    avgProgress: 64,
    lastActive: '3 days ago',
    courses: [
      { name: 'UX/UI Design Principles', progress: 100, status: 'Completed' },
      { name: 'Web Development Bootcamp', progress: 58, status: 'In Progress' },
      {
        name: 'Project Management Professional',
        progress: 35,
        status: 'In Progress'
      }
    ]
  }
]

// Course completion stats
const courseStats = [
  {
    name: 'Introduction to Machine Learning',
    enrolled: 342,
    completed: 285,
    completion: 83
  },
  {
    name: 'Web Development Bootcamp',
    enrolled: 287,
    completed: 198,
    completion: 69
  },
  {
    name: 'Project Management Professional',
    enrolled: 245,
    completed: 182,
    completion: 74
  },
  {
    name: 'Digital Marketing Fundamentals',
    enrolled: 198,
    completed: 154,
    completion: 78
  },
  {
    name: 'Advanced Data Science',
    enrolled: 156,
    completed: 89,
    completion: 57
  },
  {
    name: 'UX/UI Design Principles',
    enrolled: 132,
    completed: 87,
    completion: 66
  }
]

export default function ProgressPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Progress Tracking</h1>
        <Button>Export Report</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Active Learners
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+42 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Course Completions
            </CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">995</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpIcon className="mr-1 h-3 w-3" />
                12%
              </span>{' '}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Completion Time
            </CardTitle>
            <CircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 days</div>
            <p className="text-xs text-muted-foreground">
              -2 days from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Completion Rate
            </CardTitle>
            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpIcon className="mr-1 h-3 w-3" />
                4%
              </span>{' '}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="learners" className="space-y-4">
        <TabsList>
          <TabsTrigger value="learners">Learner Progress</TabsTrigger>
          <TabsTrigger value="courses">Course Completion</TabsTrigger>
        </TabsList>

        <TabsContent value="learners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learner Progress</CardTitle>
              <CardDescription>
                Track individual learner progress across all enrolled courses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Learner</TableHead>
                    <TableHead>Enrolled Courses</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Avg. Progress</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {learnerProgress.map((learner) => (
                    <TableRow key={learner.id}>
                      <TableCell className="font-medium">
                        <div>
                          {learner.name}
                          <div className="text-xs text-muted-foreground">
                            {learner.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{learner.enrolledCourses}</TableCell>
                      <TableCell>{learner.completedCourses}</TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs">
                            {learner.avgProgress}%
                          </span>
                          <Progress
                            value={learner.avgProgress}
                            className="h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{learner.lastActive}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            learner.avgProgress > 75
                              ? 'default'
                              : learner.avgProgress > 50
                              ? 'outline'
                              : 'secondary'
                          }
                        >
                          {learner.avgProgress > 75
                            ? 'Good'
                            : learner.avgProgress > 50
                            ? 'Average'
                            : 'Needs Attention'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Completion Stats</CardTitle>
              <CardDescription>
                Overview of completion rates for all courses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Completion Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courseStats.map((course) => (
                    <TableRow key={course.name}>
                      <TableCell className="font-medium">
                        {course.name}
                      </TableCell>
                      <TableCell>{course.enrolled}</TableCell>
                      <TableCell>{course.completed}</TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs">{course.completion}%</span>
                          <Progress value={course.completion} className="h-2" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
