import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardTile from './DashboardTile'

export function DashboardHeader() {
  const { user } = useAuth()
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold ">
            Welcome back, {user?.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground mt-1">{currentDate}</p>
        </div>

        {user?.role === 'student' && (
          <div className="mt-4 md:mt-0  p-3 rounded-lg shadow-xs border flex items-center">
            <div className="mr-4">
              <p className="text-xs font-medium text-muted-foreground">
                Current Progress
              </p>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: '45%' }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-medium">45%</span>
              </div>
            </div>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap">
              View Courses
            </button>
          </div>
        )}

        {user?.role === 'instructor' && (
          <div className="mt-4 md:mt-0 flex space-x-3">
            <DashboardTile title="My Students" value="1,248" />
            <DashboardTile title="My Courses" value="5" />
          </div>
        )}

        {user?.role === 'admin' && (
          <div className="mt-4 md:mt-0 flex space-x-3">
            <DashboardTile title="Total Users" value="1,248" />
            <DashboardTile title="Active Courses" value="54" />
          </div>
        )}
      </div>
    </div>
  )
}