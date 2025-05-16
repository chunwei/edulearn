import React, { useState } from 'react';
import { Play, FileText, MessageSquare, CheckCircle } from 'lucide-react';
import { Course, Lesson } from '../../types';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

interface CourseContentProps {
  course: Course;
  currentLesson?: Lesson;
  onSelectLesson: (lesson: Lesson) => void;
}

export function CourseContent({ course, currentLesson, onSelectLesson }: CourseContentProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'discussion'>('content');
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'content'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('content')}
        >
          Course Content
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'discussion'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('discussion')}
        >
          Discussion
        </button>
      </div>

      {activeTab === 'content' ? (
        <div className="flex-1 overflow-y-auto p-4">
          {course.lessons.map((lesson, index) => (
            <Card
              key={lesson.id}
              className={`mb-3 ${
                currentLesson?.id === lesson.id ? 'ring-2 ring-blue-500' : ''
              }`}
              hoverable
              onClick={() => onSelectLesson(lesson)}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    {lesson.videoUrl ? (
                      <Play className="size-4 text-blue-600" />
                    ) : (
                      <FileText className="size-4 text-blue-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        {index + 1}. {lesson.title}
                      </h3>
                      {lesson.isComplete && (
                        <CheckCircle className="size-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {lesson.duration}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex-1 p-4">
          <div className="space-y-4">
            {/* Discussion messages would go here */}
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">
                No messages yet
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Be the first to start a discussion about this course
              </p>
              <Button className="mt-4" variant="outline">
                Start Discussion
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}