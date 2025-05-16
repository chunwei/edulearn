import React, { useState } from 'react';
import { PlusCircle, Trash2, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export function CourseCreator() {
  const [lessons, setLessons] = useState<Array<{
    title: string;
    description: string;
    duration: string;
  }>>([{ title: '', description: '', duration: '' }]);

  const addLesson = () => {
    setLessons([...lessons, { title: '', description: '', duration: '' }]);
  };

  const removeLesson = (index: number) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle course creation
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Course</h1>
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Course Details</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  label="Course Title"
                  placeholder="Enter course title"
                  required
                  fullWidth
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Description
                  </label>
                  <textarea
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                    placeholder="Enter course description"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Category"
                    placeholder="e.g., Web Development"
                    required
                  />
                  <Input
                    label="Level"
                    placeholder="e.g., Beginner"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Thumbnail
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>Upload a file</span>
                          <input type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Course Lessons</h2>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addLesson}
                  className="flex items-center"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Lesson
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div key={index} className="p-4 border rounded-md relative">
                    <button
                      type="button"
                      onClick={() => removeLesson(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    
                    <div className="grid gap-4">
                      <Input
                        label={`Lesson ${index + 1} Title`}
                        placeholder="Enter lesson title"
                        required
                        fullWidth
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Lesson Description
                        </label>
                        <textarea
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          rows={2}
                          placeholder="Enter lesson description"
                          required
                        />
                      </div>
                      
                      <Input
                        label="Duration"
                        placeholder="e.g., 45 minutes"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Create Course</Button>
          </div>
        </form>
      </div>
    </div>
  );
}