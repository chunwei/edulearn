import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../types'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Badge } from '../ui/badge'

interface CourseCardProps {
  course: Course
}

/**
 * 课程卡片组件
 * 使用shadcn的Card组件展示课程信息
 * 支持深色模式
 */
const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full py-0 gap-0">
    <Link to={`/courses/${course.id}`} className="block">
      <div className="overflow-hidden w-full h-38">
        <img
          src={
            course.thumbnail ||
            'https://via.placeholder.com/300x180?text=Course+Image'
          }
          alt={course.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
    </Link>

    <CardHeader className="p-4 pb-0">
      <Link to={`/courses/${course.id}`} className="block">
        <CardTitle
          className="line-clamp-1"
          // className="line-clamp-1 text-lg text-card-foreground dark:text-card-foreground mb-1 truncate h-[2em] leading-tight"
          title={course.title}
        >
          {course.title}
        </CardTitle>
      </Link>
    </CardHeader>

    <CardContent className="p-4 pt-2 flex-grow">
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            course.level === 'beginner'
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              : course.level === 'intermediate'
              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
          }`}
        >
          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
        </span>
        <Badge
          variant={'secondary'}
          className={`text-xs font-semibold px-2 py-1 rounded-full`}
        >
          {course.category}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-2 line-clamp-2 h-10 leading-normal">
        {course.description}
      </p>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-muted-foreground">
          By {course.instructor.name}
        </span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          ${course.price}
        </span>
      </div>
      <div className="text-xs text-muted-foreground">
        {course.lessons.length} lessons &bull; {course.duration} &bull;{' '}
        {course.enrollmentCount} students
      </div>
    </CardContent>

    <CardFooter className="p-4 pt-0 mt-auto">
      <Button
        size="sm"
        className="w-full"
        onClick={() => alert(`Enrolling in ${course.title}`)}
      >
        Enroll Now
      </Button>
    </CardFooter>
  </Card>
)

export { CourseCard };