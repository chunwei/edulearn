import React from 'react';
import { Bell } from 'lucide-react';
import { Announcement } from '../../types';
import { Card, CardHeader, CardContent } from '../ui/card';

interface AnnouncementsListProps {
  announcements: Announcement[];
}

export function AnnouncementsList({ announcements }: AnnouncementsListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <Card>
      <CardHeader className="bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View All
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {announcements.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">No announcements yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {announcements.map((announcement) => (
              <li
                key={announcement.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bell className="size-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {announcement.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(announcement.date)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {announcement.content}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}