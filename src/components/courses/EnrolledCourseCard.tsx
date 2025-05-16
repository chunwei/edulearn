import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../types'; // Path from src/components/courses/ to src/types
// Assuming Button will be created at src/components/ui/Button.tsx
// If using a different Button, adjust import path and props
// import { Button } from '../ui/Button'; 

interface EnrolledCourseCardProps {
  course: Course;
  progress?: number; // e.g., 75 for 75%
}

const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = ({ course, progress }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
    <Link to={`/courses/${course.id}`} className="block flex-grow">
      <img 
        src={course.thumbnail || 'https://via.placeholder.com/300x180?text=Course+Image'} 
        alt={course.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate h-[2em] leading-tight" title={course.title}>{course.title}</h3>
        <p className="text-sm text-gray-600 mb-2">By {course.instructor.name}</p>
        {progress !== undefined && (
          <div className="my-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-2">{course.duration} &bull; {course.level.charAt(0).toUpperCase() + course.level.slice(1)}</p>
      </div>
    </Link>
    <div className="p-4 border-t mt-auto">
        <Link to={`/courses/${course.id}/learn`} className="w-full">
            {/* Replace with Button component once available and if it supports asChild or direct Link styling */}
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-sm w-full">
                Continue Learning
            </button>
        </Link>
    </div>
  </div>
);

export { EnrolledCourseCard }; 