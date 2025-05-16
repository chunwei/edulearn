import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers } from '../data/mockData';
// Course type might not be needed here anymore if all display logic is moved
// import { Course } from '../types'; 
import { BookOpen, AlertTriangle } from 'lucide-react';
// Specific course cards are not needed here anymore
// import { EnrolledCourseCard } from '../components/courses/EnrolledCourseCard';
// import { TaughtCourseCard } from '../components/courses/TaughtCourseCard';
import { StudentCoursesPage } from './student/StudentCoursesPage'; // Import new student page
import { InstructorCoursesPage } from './instructor/InstructorCoursesPage'; // Import new instructor page

export function MyCoursesPage() {
  const { user: authUser } = useAuth();

  const currentUser = useMemo(() => {
    if (!authUser) return null;
    return mockUsers.find(u => u.id === authUser.id);
  }, [authUser]);

  // Handle unauthenticated users
  if (!authUser || !currentUser) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Access Denied</h2>
        <p className="text-gray-600">Please <Link to="/login" className="text-blue-600 hover:underline">log in</Link> to view your courses.</p>
      </div>
    );
  }
  
  // Dispatch to role-specific pages or handle admin
  if (currentUser.role === 'student') {
    return <StudentCoursesPage />;
  }
  
  if (currentUser.role === 'instructor') {
    return <InstructorCoursesPage />;
  }
  
  if (currentUser.role === 'admin') {
      return (
          <div className="container mx-auto px-4 py-8 text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Course Management</h2>
            <p className="text-gray-600">
                As an administrator, you can manage all courses and user activities through the admin panel.
            </p>
            <Link to="/admin/dashboard" className="text-blue-600 hover:underline">
                Go to Admin Dashboard
            </Link>
            {/* Or, if there's a dedicated AdminCoursesOverviewPage, render it here */}
          </div>
      );
  }

  // Fallback for any other unhandled role or scenario, though ideally this shouldn't be reached
  return (
    <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">My Courses</h2>
        <p className="text-gray-600">Could not determine user role to display courses.</p>
    </div>
  );
} 