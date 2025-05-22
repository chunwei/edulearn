import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjusted path
import { mockCourses, mockUsers } from '../../data/mockData'; // Adjusted path
import { Course } from '../../types'; // Adjusted path
import { BookOpen } from 'lucide-react';
import { TaughtCourseCard } from '../../components/courses/TaughtCourseCard'; // Adjusted path

export function InstructorCoursesPage() {
  const { user: authUser } = useAuth();
  const [taughtCourses, setTaughtCourses] = useState<Course[]>([]);

  const currentUser = useMemo(() => {
    if (!authUser) return null;
    return mockUsers.find((u) => u.email === authUser.email)
  }, [authUser]);

  useEffect(() => {
    if (authUser && currentUser && currentUser.role === 'instructor') {
      setTaughtCourses(
        mockCourses.filter((c) => c.instructor.email === currentUser.email)
      )
    }
  }, [authUser, currentUser]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">My Teaching Courses</h1>
        <p className="text-lg text-gray-600">
          Manage and review the courses you are teaching.
        </p>
      </header>

      {taughtCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {taughtCourses.map(course => (
            <TaughtCourseCard 
                key={course.id} 
                course={course} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">You Are Not Teaching Any Courses Yet</h3>
          <p className="text-gray-500 mb-4">It looks like you haven't created or been assigned to any courses.</p>
          <Link to="/course/create"> 
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create a New Course
            </button>
          </Link>
        </div>
      )}
    </div>
  );
} 