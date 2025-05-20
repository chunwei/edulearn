import React from 'react';
import { Users, BookOpen, Clock, Award } from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { AnnouncementsList } from './AnnouncementsList';
import { Card, CardContent } from '../ui/card';
import { mockAnnouncements, mockCourses } from '../../data/mockData';
import { Link } from 'react-router-dom';

export function InstructorDashboard() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
              <Users className="size-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Students
              </p>
              <p className="text-2xl font-bold">128</p>
              <p className="text-xs text-green-600">+12% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
              <BookOpen className="size-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Active Courses
              </p>
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs text-green-600">+1 new this month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-3 rounded-full bg-amber-100 text-amber-800 mr-4">
              <Clock className="size-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Teaching Hours
              </p>
              <p className="text-2xl font-bold">64</p>
              <p className="text-xs text-green-600">+8 from last week</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
              <Award className="size-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Rating</p>
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-xs text-green-600">+0.2 from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  Recent Student Activity
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View All Activity
                </button>
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="flex items-start space-x-3 p-3 border-b last:border-0"
                  >
                    <img
                      src={`https://images.pexels.com/photos/${
                        1000000 + item
                      }/pexels-photo-${
                        1000000 + item
                      }.jpeg?auto=compress&cs=tinysrgb&w=50`}
                      alt="Student"
                      className="size-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">Student {item}</p>
                      <p className="text-xs text-muted-foreground">
                        {item % 2 === 0
                          ? `Completed lesson ${item} in Web Development Course`
                          : `Submitted assignment ${item} for review`}
                      </p>
                      <p className="text-xs text-muted-foreground/80 mt-1">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Upcoming Classes</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View Schedule
                </button>
              </div>

              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-3 bg-accent rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-2 h-10 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">
                          {mockCourses[
                            item % mockCourses.length
                          ].title.substring(0, 30)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Module {item} - Introduction
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        Today, {4 + item}:00 PM
                      </p>
                      <p className="text-xs text-muted-foreground">
                        45 minutes
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <AnnouncementsList announcements={mockAnnouncements} />

          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/course/create"
                  className="flex flex-col items-center justify-center p-4 border  rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <BookOpen className="size-6 text-blue-600 mb-2" />
                  <span className="text-sm text-secondary-foreground">
                    Create Course
                  </span>
                </Link>

                <button className="flex flex-col items-center justify-center p-4 border  rounded-lg hover:bg-muted/50 transition-colors">
                  <Users className="size-6 text-green-600 mb-2" />
                  <span className="text-sm text-secondary-foreground">
                    Invite Students
                  </span>
                </button>

                <button className="flex flex-col items-center justify-center p-4 border  rounded-lg hover:bg-muted/50 transition-colors">
                  <Clock className="size-6 text-amber-600 mb-2" />
                  <span className="text-sm text-secondary-foreground">
                    Schedule Class
                  </span>
                </button>

                <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <Award className="size-6 text-purple-600 mb-2" />
                  <span className="text-sm text-secondary-foreground">
                    Grade Assignments
                  </span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}