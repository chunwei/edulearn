import React from 'react';
import { FileText, Calendar } from 'lucide-react';
import { Assignment } from '../../types';
import { Card, CardHeader, CardContent } from '../ui/card';

interface UpcomingAssignmentsProps {
  assignments: Assignment[];
}

export function UpcomingAssignments({ assignments }: UpcomingAssignmentsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Calculate days remaining
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <Card>
      <CardHeader className="bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Assignments</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {assignments.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">No upcoming assignments.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {assignments.map((assignment) => {
              const daysLeft = getDaysRemaining(assignment.dueDate);
              let statusColor = 'text-green-700 bg-green-100';
              
              if (daysLeft < 0) {
                statusColor = 'text-red-700 bg-red-100';
              } else if (daysLeft <= 2) {
                statusColor = 'text-amber-700 bg-amber-100';
              }
              
              return (
                <li
                  key={assignment.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="shrink-0">
                      <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileText className="size-5 text-blue-600" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {assignment.title}
                        </p>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}
                        >
                          {daysLeft < 0
                            ? 'Overdue'
                            : daysLeft === 0
                            ? 'Due Today'
                            : `${daysLeft} days left`}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                        {assignment.description}
                      </p>

                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Due {formatDate(assignment.dueDate)}</span>
                        <span className="mx-2">•</span>
                        <span>{assignment.points} points</span>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}