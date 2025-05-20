import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// 移除 mockUsers 导入
// import { mockUsers } from '../data/mockData';
import { BookOpen, AlertTriangle } from 'lucide-react';
import { StudentCoursesPage } from './student/StudentCoursesPage';
import { InstructorCoursesPage } from './instructor/InstructorCoursesPage';

/**
 * 我的课程页面组件
 * 根据用户角色显示不同的课程视图
 */
export function MyCoursesPage() {
  // 直接使用 useAuth 获取的用户信息
  const { user } = useAuth();

  // 移除 currentUser 变量和 useMemo

  // 处理未认证用户
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold  mb-2">Access Denied</h2>
        <p className="text-muted-foreground">
          Please{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            log in
          </Link>{' '}
          to view your courses.
        </p>
      </div>
    )
  }
  
  // 根据角色分发到特定页面
  if (user.role === 'student') {
    return <StudentCoursesPage />;
  }
  
  if (user.role === 'instructor') {
    return <InstructorCoursesPage />;
  }
  
  if (user.role === 'admin') {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-semibold  mb-2">Course Management</h2>
        <p className="text-muted-foreground">
          As an administrator, you can manage all courses and user activities
          through the admin panel.
        </p>
        <Link to="/admin/dashboard" className="text-blue-600 hover:underline">
          Go to Admin Dashboard
        </Link>
      </div>
    )
  }

  // 回退处理
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-semibold mb-2">My Courses</h2>
      <p className="text-muted-foreground">
        Could not determine user role to display courses.
      </p>
    </div>
  )
}