import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../types'; // Adjust path as necessary
import { Button } from '../ui/button'; // Adjust path as necessary
import { Edit3, Users, Megaphone } from 'lucide-react';

interface TaughtCourseCardProps {
  course: Course;
}

const TaughtCourseCard: React.FC<TaughtCourseCardProps> = ({ course }) => {
  const handleEditCourse = () => {
    // Navigate to course edit page, e.g., /teachings/courses/:courseId/edit
    alert(`Navigating to edit course: ${course.title}`);
  };

  const handleViewRoster = () => {
    // Navigate to student roster for this course
    alert(`Viewing roster for course: ${course.title}`);
  };

  const handleMakeAnnouncement = () => {
    // Navigate to announcement creation for this course
    alert(`Making announcement for course: ${course.title}`);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-white">
      <Link to={`/courses/${course.id}`} className="block">
        <img 
          src={course.thumbnail || 'https://via.placeholder.com/300x180?text=Course+Image'} 
          alt={course.title} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate h-[2em] leading-tight" title={course.title}>
            {course.title}
          </h3>
          <p className="text-sm text-gray-500 mb-1">Category: {course.category}</p>
          <p className="text-sm text-gray-500 mb-2">
            Level: {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </p>
          <div className="text-xs text-gray-500">
            {course.duration} &bull; {course.enrollmentCount} students enrolled
          </div>
        </div>
      </Link>
      <div className="p-3 border-t mt-auto bg-gray-50 grid grid-cols-3 gap-2">
        <Button variant="outline" size="sm" onClick={handleEditCourse} className="flex items-center justify-center text-xs">
          <Edit3 className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
        <Button variant="outline" size="sm" onClick={handleViewRoster} className="flex items-center justify-center text-xs">
          <Users className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Roster</span>
        </Button>
        <Button variant="outline" size="sm" onClick={handleMakeAnnouncement} className="flex items-center justify-center text-xs">
          <Megaphone className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Announce</span>
        </Button>
      </div>
    </div>
  );
};

export { TaughtCourseCard }; 