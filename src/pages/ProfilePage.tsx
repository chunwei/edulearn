import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers, mockCourses } from '../data/mockData'; // Assuming you might want to show courses too
import { User, Course } from '../types';
import { Edit3, Save, Mail, Briefcase, GraduationCap, AlertCircle, UserCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export function ProfilePage() {
  const { user: authUser, updateUser: updateAuthUserContext } = useAuth(); // Assuming updateUser in auth context
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Email might not be editable depending on policy
  const [avatarUrl, setAvatarUrl] = useState('');

  // Example: Fetch student's enrolled courses or instructor's teaching courses
  const [userAssociatedCourses, setUserAssociatedCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (authUser) {
      const foundUser = mockUsers.find((u) => u.email === authUser.email)
      if (foundUser) {
        setProfileUser(foundUser);
        setName(foundUser.name);
        setEmail(foundUser.email);
        setAvatarUrl(foundUser.avatar || '');

        // Load associated courses
        if (foundUser.role === 'student') {
          // Simplified: find courses where student ID '1' (John Doe) is hardcoded in description or similar hack for mock
          // Or, if you adapt mockData to have enrolledCourseIds on User:
          // const enrolled_ids = (foundUser as any).enrolledCourseIds || [];
          // setUserAssociatedCourses(mockCourses.filter(c => enrolled_ids.includes(c.id)));
          // if (foundUser.id === '1') { // John Doe from mockData
          setUserAssociatedCourses(
            mockCourses.filter((c) => c.id === '1' || c.id === '2')
          )
          // }
        } else if (foundUser.role === 'instructor') {
          setUserAssociatedCourses(
            mockCourses.filter((c) => c.instructor.email === foundUser.email)
          )
        }

      } else {
        setProfileUser(null); // User not found in mock data, though this shouldn't happen if authUser.id is valid
      }
    }
  }, [authUser]);

  const handleSave = () => {
    if (!profileUser) return;
    
    const updatedUser: User = {
      ...profileUser,
      name: name,
      // email: email, // Usually email is not changed this way or requires verification
      avatar: avatarUrl,
    };

    // In a real app, send to backend API
    // For mock: update mockUsers array
    const userIndex = mockUsers.findIndex((u) => u.email === updatedUser.email)
    if (userIndex !== -1) {
      mockUsers[userIndex] = updatedUser;
    }
    setProfileUser(updatedUser);
    updateAuthUserContext(updatedUser); // Update user in AuthContext
    setIsEditing(false);
  };

  if (!authUser || !profileUser) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <p className="text-xl">User profile not available. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <Avatar className="h-32 w-32 md:mr-8 mb-6 md:mb-0 rounded-full shadow-md ring-2 ring-blue-500 ring-offset-2 text-4xl">
            <AvatarImage
              src={isEditing ? avatarUrl : profileUser.avatar}
              alt={profileUser.name}
            />
            <AvatarFallback className="text-4xl">
              {profileUser.name ? (
                profileUser.name.substring(0, 1).toUpperCase()
              ) : (
                <UserCircle2 className="h-24 w-24 text-gray-400" />
              )}
            </AvatarFallback>
          </Avatar>

          <div className="flex-grow text-center md:text-left">
            {isEditing ? (
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-3xl font-bold text-gray-800 mb-1 w-full p-2 border rounded"
              />
            ) : (
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                {profileUser.name}
              </h1>
            )}
            <p className="text-md text-blue-600 font-semibold mb-3 capitalize flex items-center justify-center md:justify-start">
              {profileUser.role === 'instructor' ? (
                <Briefcase className="mr-2 size-5" />
              ) : (
                <GraduationCap className="mr-2 size-5" />
              )}
              {profileUser.role}
            </p>
            {isEditing ? (
              <Input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="Enter image URL for avatar"
                className="text-sm text-gray-600 mb-4 w-full p-2 border rounded"
              />
            ) : null}
            <p className="text-sm text-gray-600 flex items-center justify-center md:justify-start mb-1">
              <Mail className="mr-2 size-4 text-gray-500" /> {profileUser.email}
            </p>
          </div>
          <div className="mt-6 md:mt-0 md:ml-auto">
            {isEditing ? (
              <Button onClick={handleSave} size="sm">
                <Save className="mr-2 size-4" /> Save Changes
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
              >
                <Edit3 className="mr-2 size-4" /> Edit Profile
              </Button>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Edit Email (Caution)
            </h3>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter new email (requires verification in real app)"
              className="text-sm text-gray-600 mb-4 w-full md:w-1/2 p-2 border rounded"
              disabled // Typically email changes are more complex or disabled directly on profile edit.
            />
            <p className="text-xs text-gray-500">
              Changing email usually requires a verification process. This field
              is disabled for this demo.
            </p>
          </div>
        )}

        <div className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {profileUser.role === 'student'
              ? 'Enrolled Courses'
              : profileUser.role === 'instructor'
              ? 'My Teachings'
              : 'Platform Activity'}
          </h2>
          {userAssociatedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userAssociatedCourses.map((course) => (
                <Link
                  to={`/courses/${course.id}`}
                  key={course.id}
                  className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm transition-colors"
                >
                  <h3 className="font-semibold text-blue-700">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {course.category} - {course.level}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {course.duration}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              {profileUser.role === 'student'
                ? 'No courses enrolled yet. '
                : profileUser.role === 'instructor'
                ? 'You are not teaching any courses yet. '
                : 'No specific activity to display for admin.'}
              {profileUser.role === 'student' && (
                <Link to="/courses" className="text-blue-600 hover:underline">
                  Explore courses
                </Link>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  )
} 