import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Course, Lesson } from '../types';
import { CourseContent } from '../components/courses/CourseContent';
import { LessonViewer } from '../components/courses/LessonViewer';
import { mockCourses } from '../data/mockData';

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (courseId) {
      const foundCourse = mockCourses.find(c => c.id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        if (foundCourse.lessons.length > 0) {
          setCurrentLesson(foundCourse.lessons[0]);
        }
      } else {
        setError('Course not found.');
      }
    }
  }, [courseId]);

  if (error) {
    return <div className="p-4 text-red-500">Error: {error} <button onClick={() => navigate(-1)} className="text-blue-500 hover:underline ml-2">Go Back</button></div>;
  }

  if (!course) {
    return <div className="p-4">Loading course...</div>;
  }
  
  return (
    <div className="h-full flex">
      {/* Course content sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button onClick={() => navigate('/courses')} className="flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Courses
          </button>
          <h1 className="text-lg font-semibold text-gray-900 mt-2">{course.title}</h1>
        </div>
        <CourseContent
          course={course}
          currentLesson={currentLesson}
          onSelectLesson={setCurrentLesson}
        />
      </div>
      
      {/* Lesson viewer */}
      <div className="flex-1">
        {currentLesson ? (
          <LessonViewer lesson={currentLesson} courseId={course.id} />
        ) : course.lessons.length > 0 ? (
           <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Select a lesson to begin.</p>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">This course has no lessons yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}