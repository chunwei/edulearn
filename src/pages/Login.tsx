import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { Card, CardContent } from '../components/ui/card';

export function Login({ onSuccess }: { onSuccess?: () => void }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-blue-600">EduLearn</h1>
          <p className="mt-2 text-sm text-gray-600">Your Online Education Platform</p>
        </div>
        
        <Card>
          <CardContent className="py-8">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}