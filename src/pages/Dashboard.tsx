import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { StudentDashboard } from '../components/dashboard/StudentDashboard';
import { InstructorDashboard } from '../components/dashboard/InstructorDashboard';
import { AdminDashboard } from '../components/dashboard/AdminDashboard';

export function Dashboard() {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  // Render the appropriate dashboard based on user role
  if (user.role === 'student') {
    return <StudentDashboard />;
  } else if (user.role === 'instructor') {
    return <InstructorDashboard />;
  } else if (user.role === 'admin') {
    return <AdminDashboard />;
  }
  
  return <div>Unknown user role</div>;
}