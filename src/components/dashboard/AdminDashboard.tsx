import React from 'react';
import { Users, BookOpen, GraduationCap, DollarSign } from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { Card, CardContent, CardHeader } from '../ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '../ui/table'
import { AnnouncementsList } from './AnnouncementsList'
import { mockAnnouncements } from '../../data/mockData'

export function AdminDashboard() {
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
              <p className="text-sm font-medium text-muted-foreground">
                Total Users
              </p>
              <p className="text-2xl font-bold ">1,248</p>
              <p className="text-xs text-green-600">+8% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
              <BookOpen className="size-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Courses
              </p>
              <p className="text-2xl font-bold ">54</p>
              <p className="text-xs text-green-600">+3 new this month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-3 rounded-full bg-amber-100 text-amber-800 mr-4">
              <GraduationCap className="size-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Enrollments
              </p>
              <p className="text-2xl font-bold ">875</p>
              <p className="text-xs text-green-600">+12% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
              <DollarSign className="size-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Revenue
              </p>
              <p className="text-2xl font-bold ">$12,450</p>
              <p className="text-xs text-green-600">+15% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold ">Platform Analytics</h2>
            </CardHeader>

            <CardContent>
              <div className="bg-accent rounded-lg p-4 text-center mb-4">
                <p className="text-muted-foreground text-sm">
                  Analytics chart will be displayed here
                </p>
                <div className="h-64 mt-2 rounded-lg border border-dashed  flex items-center justify-center">
                  <div className="text-muted-foreground">
                    <p className="font-medium">User Growth Trend</p>
                    <p className="text-xs mt-1">
                      Monthly active users over time
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border  rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    New Users
                  </p>
                  <p className="text-xl font-bold ">+124</p>
                  <p className="text-xs text-green-600">+18% from last week</p>
                </div>

                <div className="border  rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    Completion Rate
                  </p>
                  <p className="text-xl font-bold ">68%</p>
                  <p className="text-xs text-green-600">+5% from last month</p>
                </div>

                <div className="border  rounded-lg p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    Avg. Session
                  </p>
                  <p className="text-xl font-bold ">24m</p>
                  <p className="text-xs text-green-600">+2m from last week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold ">Recent Activity</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View All
                </button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right ">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <TableRow key={item}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="size-8 rounded-full bg-secondary"></div>
                            <div className="ml-3">
                              <p className="text-sm font-medium">User {item}</p>
                              <p className="text-xs text-muted-foreground">
                                user{item}@example.com
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-secondary-foreground">
                          {item % 3 === 0
                            ? 'Created course'
                            : item % 3 === 1
                            ? 'Enrolled in course'
                            : 'Updated profile'}
                        </TableCell>
                        <TableCell className="text-sm text-secondary-foreground">
                          {item % 3 === 0
                            ? 'Course #12'
                            : item % 3 === 1
                            ? 'Course #45'
                            : 'User settings'}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {item} hour{item !== 1 ? 's' : ''} ago
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              item % 3 === 0
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : item % 3 === 1
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                            }`}
                          >
                            {item % 3 === 0
                              ? 'Completed'
                              : item % 3 === 1
                              ? 'In Progress'
                              : 'Pending'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <AnnouncementsList announcements={mockAnnouncements} />

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold ">Admin Tasks</h2>
            </CardHeader>

            <CardContent className="p-0">
              <ul className="divide-y">
                {[
                  'Review new instructor applications',
                  'Approve pending course submissions',
                  'Review reported content',
                  'Update platform announcements',
                  'Schedule system maintenance'
                ].map((task, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 hover:bg-muted/50 flex items-center"
                  >
                    <input
                      type="checkbox"
                      className="size-4 text-blue-600 focus:ring-blue-500  rounded"
                    />
                    <span className="ml-3 text-sm text-secondary-foreground">
                      {task}
                    </span>

                    {index === 0 && (
                      <span className="ml-auto text-xs font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                        Urgent
                      </span>
                    )}

                    {index === 1 && (
                      <span className="ml-auto text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        High
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}