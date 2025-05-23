import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom'
// 导入新的认证提供者
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Layout } from './pages/Layout'
import { Login } from './pages/auth/Login'
import { Dashboard } from './pages/Dashboard'
import { CoursePage } from './pages/CoursePage'
import { CourseCreator } from './pages/CourseCreator'
import { AssignmentSubmission } from './pages/AssignmentSubmission'
import { Discussion } from './pages/Discussion'
import { CoursesListPage } from './pages/CoursesListPage'
import { MessagesPage } from './pages/MessagesPage'
import { CalendarPage } from './pages/CalendarPage'
import { MyCoursesPage } from './pages/MyCoursesPage'
import { HelpPage } from './pages/HelpPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProfilePage } from './pages/ProfilePage'
import { SignUp } from './pages/auth/SignUp'
import { AuthLayout } from './components/layout/AuthLayout'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { UpdatePassword } from './pages/auth/UpdatePassword'
import ProgressPage from './pages/ProgressPage'
import CertificatesPage from './pages/CertificatesPage'
import CertificateTemplateCreatePage from './pages/CertificateCreator'
import { ExamsListPage } from './pages/student/ExamsListPage'
import { ExamResultsPage } from './pages/student/ExamResultsPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // 使用新的 hook
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

/**
 * 认证布局路由组件
 * 为登录和注册页面提供共享布局
 */
function AuthLayoutRoute() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}

function AppContent() {
  return (
    <Layout>
      <Routes>
        {/* 认证相关路由使用共享布局 */}
        <Route element={<AuthLayoutRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* 其他受保护路由保持不变 */}
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
          path="/progress"
          element={
            <ProtectedRoute>
              <ProgressPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificates"
          element={
            <ProtectedRoute>
              <CertificatesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificates/create"
          element={
            <ProtectedRoute>
              <CertificateTemplateCreatePage />
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
              <CoursePage />
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
          path="/student/exams"
          element={
            <ProtectedRoute>
              <ExamsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/exams/results/:examId"
          element={
            <ProtectedRoute>
              <ExamResultsPage />
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
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App;