import React from 'react';
import { Bell, Calendar } from 'lucide-react'
import { Announcement } from '../../types'
import { Card, CardHeader, CardContent } from '../ui/card'

interface AnnouncementsListProps {
  announcements: Announcement[]
}

export function AnnouncementsList({ announcements }: AnnouncementsListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Announcements</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View All
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {announcements.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No announcements yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {announcements.map((announcement) => (
              <li
                key={announcement.id}
                className="p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bell className="size-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col  justify-between">
                      <p className="text-sm font-medium">
                        {announcement.title}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {announcement.content}
                    </p>
                    <div className="flex items-center text-muted-foreground mt-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="text-xs ">
                        {formatDate(announcement.date)}
                      </span>
                    </div>
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