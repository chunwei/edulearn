import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function DashboardHeader() {
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-1">{currentDate}</p>
        </div>
        
        {user?.role === 'student' && (
          <div className="mt-4 md:mt-0 bg-white p-3 rounded-lg shadow-xs border border-gray-200 flex items-center">
            <div className="mr-4">
              <p className="text-xs font-medium text-gray-500">Current Progress</p>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">45%</span>
              </div>
            </div>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap">
              View Courses
            </button>
          </div>
        )}
        
        {user?.role === 'instructor' && (
          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <p className="text-xs font-medium text-gray-500">My Students</p>
              <p className="text-xl font-semibold text-gray-800">128</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <p className="text-xs font-medium text-gray-500">Courses</p>
              <p className="text-xl font-semibold text-gray-800">5</p>
            </div>
          </div>
        )}
        
        {user?.role === 'admin' && (
          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <p className="text-xs font-medium text-gray-500">Total Users</p>
              <p className="text-xl font-semibold text-gray-800">1,248</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <p className="text-xs font-medium text-gray-500">Active Courses</p>
              <p className="text-xl font-semibold text-gray-800">54</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}