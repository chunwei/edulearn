import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../types'; // Corrected path from src/components/courses/CourseCard.tsx to src/types
import { Button } from '../ui/button'; // Corrected path from src/components/courses/CourseCard.tsx to src/components/ui/Button

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
  <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
    <Link to={`/courses/${course.id}`} className="block flex-grow">
      <img src={course.thumbnail || 'https://via.placeholder.com/300x180?text=Course+Image'} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate h-[2em] leading-tight" title={course.title}>{course.title}</h3>
        <p className="text-sm text-gray-600 mb-2">By {course.instructor.name}</p>
        <p className="text-xs text-gray-500 mb-2 truncate h-10 leading-normal">{course.description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${course.level === 'beginner' ? 'bg-green-100 text-green-700' : course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </span>
          <span className="text-sm font-bold text-blue-600">${course.price}</span>
        </div>
        <div className="text-xs text-gray-500">{course.duration} &bull; {course.enrollmentCount} students</div>
      </div>
    </Link>
    <div className="p-4 border-t mt-auto">
        <Button size="sm" className="w-full" onClick={() => alert(`Enrolling in ${course.title}`)}>Enroll Now</Button>
    </div>
  </div>
);

export { CourseCard };