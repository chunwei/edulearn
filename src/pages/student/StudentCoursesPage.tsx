import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjusted path
import { mockCourses, mockUsers } from '../../data/mockData'; // Adjusted path
import { Course } from '../../types'; // Adjusted path
import { BookOpen } from 'lucide-react';
import { EnrolledCourseCard } from '../../components/courses/EnrolledCourseCard'; // Adjusted path

export function StudentCoursesPage() {
  const { user: authUser } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  const currentUser = useMemo(() => {
    if (!authUser) return null;
    return mockUsers.find(u => u.id === authUser.id);
  }, [authUser]);

  useEffect(() => {
    if (authUser && currentUser && currentUser.role === 'student') {
      let studentCourses: Course[] = [];
      // SIMULATED: In a real app, authUser might have enrolledCourseIds or you'd fetch them.
      if (authUser.id === '1') { // John Doe
        studentCourses = mockCourses.filter(c => c.id === '1' || c.id === '2');
      }
      // For other demo students, or if no specific logic, show no courses for now
      setEnrolledCourses(studentCourses);
    }
  }, [authUser, currentUser]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">My Enrolled Courses</h1>
        <p className="text-lg text-gray-600">
          Continue your learning journey with the courses you are enrolled in.
        </p>
      </header>

      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map(course => (
            <EnrolledCourseCard 
                key={course.id} 
                course={course} 
                progress={Math.floor(Math.random() * 100)} // Random progress for demo
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Courses Enrolled Yet</h3>
          <p className="text-gray-500 mb-4">It looks like you haven't enrolled in any courses.</p>
          <Link to="/courses">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Explore Courses
            </button>
          </Link>
        </div>
      )}
    </div>
  );
} 