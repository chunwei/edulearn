import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Lesson, Material } from '../../types';
import { Card, CardContent } from '../ui/card';

interface LessonViewerProps {
  lesson: Lesson;
  courseId?: string;
}

export function LessonViewer({ lesson, courseId }: LessonViewerProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">{lesson.title}</h2>
        <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
      </div>
      
      <div className="flex-1 p-4">
        {lesson.videoUrl ? (
          <div className="aspect-video bg-gray-900 rounded-lg mb-6">
            <div className="w-full h-full flex items-center justify-center text-white">
              Video player will be implemented here
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="prose max-w-none">
              {/* Lesson content would be rendered here */}
              <p className="text-gray-600">{lesson.description}</p>
            </div>
          </div>
        )}
        
        {lesson.materials.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Lesson Materials</h3>
            <div className="grid gap-3">
              {lesson.materials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface MaterialCardProps {
  material: Material;
}

function MaterialCard({ material }: MaterialCardProps) {
  return (
    <Card hoverable>
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          
          <div className="ml-3 flex-1">
            <h4 className="text-sm font-medium text-gray-900">{material.title}</h4>
            <p className="text-xs text-gray-500 capitalize">{material.type}</p>
          </div>
          
          {material.url && (
            <button className="ml-4 p-2 text-gray-400 hover:text-gray-500">
              <Download className="h-5 w-5" />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}