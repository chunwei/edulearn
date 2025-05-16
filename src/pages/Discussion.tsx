import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function Discussion() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    setMessage('');
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Course Discussion
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Engage with your peers and instructors
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="h-[600px] flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Sample messages */}
                  <div className="flex items-start space-x-3">
                    <img
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"
                      alt="User"
                      className="size-8 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          John Doe
                        </span>
                        <span className="text-xs text-gray-500">
                          2 hours ago
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">
                        Has anyone completed the final project? I'm looking for
                        some guidance on the implementation details.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <img
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
                      alt="User"
                      className="size-8 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          Jane Smith
                        </span>
                        <span className="text-xs text-gray-500">
                          1 hour ago
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">
                        I can help! I've already submitted mine. The key is to
                        focus on the responsive design aspects first.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 p-4">
                  <form onSubmit={handleSubmit} className="flex space-x-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Button type="submit" className="flex items-center">
                      <Send className="size-4 mr-2" />
                      Send
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}