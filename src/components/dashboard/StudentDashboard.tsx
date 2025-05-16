import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { CourseCard } from '../courses/CourseCard';
import { AnnouncementsList } from './AnnouncementsList';
import { UpcomingAssignments } from './UpcomingAssignments';
import { mockCourses, mockAnnouncements, mockAssignments } from '../../data/mockData';

export function StudentDashboard() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <DashboardHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockCourses.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recommended Courses</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">Browse Catalog</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockCourses.slice(2, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <UpcomingAssignments assignments={mockAssignments} />
          <AnnouncementsList announcements={mockAnnouncements} />
        </div>
      </div>
    </div>
  );
}