import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './pages/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CoursePage } from './pages/CoursePage';
import { CourseCreator } from './pages/CourseCreator';
import { AssignmentSubmission } from './pages/AssignmentSubmission';
import { Discussion } from './pages/Discussion';
import { CoursesListPage } from './pages/CoursesListPage';
import { MessagesPage } from './pages/MessagesPage';
import { CalendarPage } from './pages/CalendarPage';
import { MyCoursesPage } from './pages/MyCoursesPage';
import { HelpPage } from './pages/HelpPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppContent() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CoursesListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <HelpPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses/:courseId"
            element={
              <ProtectedRoute>
                <CoursePage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/create"
            element={
              <ProtectedRoute>
                <CourseCreator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assignment/:assignmentId"
            element={
              <ProtectedRoute>
                <AssignmentSubmission />
              </ProtectedRoute>
            }
          />
          <Route
            path="/discussion/:courseId"
            element={
              <ProtectedRoute>
                <Discussion />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;