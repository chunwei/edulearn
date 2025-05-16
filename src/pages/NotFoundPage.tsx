import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <AlertTriangle className="h-24 w-24 text-red-500 mb-6" />
      <h1 className="text-6xl font-bold text-gray-800 mb-3">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Button size="lg">
        <Link to="/dashboard" className="flex items-center">
          <Home className="mr-2 h-5 w-5" />
          Go to Dashboard
        </Link>
      </Button>
      <p className="mt-12 text-sm text-gray-500">
        If you believe this is an error, please contact support.
      </p>
    </div>
  );
} 