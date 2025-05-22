import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Lesson, Material } from '../../types';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button'

interface LessonViewerProps {
  lesson: Lesson
  courseId?: string
}

export function LessonViewer({ lesson, courseId }: LessonViewerProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold ">{lesson.title}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {lesson.description}
        </p>
      </div>

      <div className="flex-1 p-4">
        {lesson.videoUrl ? (
          <div className="aspect-video  rounded-lg mb-6">
            <div className="w-full h-full flex items-center justify-center">
              Video player will be implemented here
            </div>
          </div>
        ) : (
          <div className="bg-accent/50 rounded-lg p-6 mb-6">
            <div className="prose max-w-none">
              {/* Lesson content would be rendered here */}
              <p className="text-muted-foreground">{lesson.description}</p>
            </div>
          </div>
        )}

        {lesson.materials.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3">Lesson Materials</h3>
            <div className="grid gap-3">
              {lesson.materials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface MaterialCardProps {
  material: Material
}

function MaterialCard({ material }: MaterialCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <FileText className="size-5 text-blue-600" />
          </div>

          <div className="ml-3 flex-1">
            <h4 className="text-sm font-medium">{material.title}</h4>
            <p className="text-xs text-muted-foreground/90 capitalize">
              {material.type}
            </p>
          </div>

          {material.url && (
            <Button variant={'ghost'}>
              <Download className="size-5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}