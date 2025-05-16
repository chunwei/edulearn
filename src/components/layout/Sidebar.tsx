import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Video, 
  Calendar, 
  MessageSquare, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  to?: string;
  onClick?: () => void;
}

function SidebarLink({ icon, text, active = false, to, onClick }: SidebarLinkProps) {
  const baseClasses = 'flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer';
  const activeClasses = active
    ? 'bg-blue-50 text-blue-700 font-medium'
    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900';
    
  const content = (
    <>
      {icon}
      <span>{text}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${activeClasses}`}>
        {content}
      </Link>
    );
  }
  
  return (
    <div className={`${baseClasses} ${activeClasses}`} onClick={onClick}>
      {content}
    </div>
  );
}

export function Sidebar() {
  const { user } = useAuth();
  const userRole = user?.role || 'student';
  
  return (
    <aside className="bg-white w-64 border-r border-gray-200 h-screen sticky top-0 overflow-y-auto hidden md:block">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">EduLearn</h2>
        <p className="text-sm text-gray-500">Online Education Platform</p>
      </div>
      
      <div className="px-3 py-2">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Main</p>
        
        <div className="space-y-1">
          <SidebarLink icon={<Home size={18} />} text="Dashboard" to="/dashboard" active />
          <SidebarLink icon={<BookOpen size={18} />} text="My Courses" to="/my-courses" />
          <SidebarLink icon={<Video size={18} />} text="Live Classes" to="/live-classes" />
          <SidebarLink icon={<Calendar size={18} />} text="Schedule" to="/calendar" />
          <SidebarLink icon={<MessageSquare size={18} />} text="Messages" to="/messages" />
        </div>
      </div>
      
      {userRole === 'instructor' && (
        <div className="px-3 py-2 mt-6">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Instructor</p>
          
          <div className="space-y-1">
            <SidebarLink icon={<BookOpen size={18} />} text="My Teachings" to="/teachings" />
            <SidebarLink icon={<Users size={18} />} text="Students" to="/instructor/students" />
            <SidebarLink icon={<FileText size={18} />} text="Assignments" to="/instructor/assignments" />
          </div>
        </div>
      )}
      
      {userRole === 'admin' && (
        <div className="px-3 py-2 mt-6">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Administration</p>
          
          <div className="space-y-1">
            <SidebarLink icon={<Users size={18} />} text="User Management" to="/admin/users" />
            <SidebarLink icon={<BookOpen size={18} />} text="Course Management" to="/admin/courses" />
            <SidebarLink icon={<Settings size={18} />} text="Platform Settings" to="/admin/platform-settings" />
          </div>
        </div>
      )}
      
      <div className="px-3 py-2 mt-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Support</p>
        
        <div className="space-y-1">
          <SidebarLink icon={<HelpCircle size={18} />} text="Help Center" to="/help" />
          <SidebarLink icon={<Settings size={18} />} text="Settings" to="/settings" />
        </div>
      </div>
      
      <div className="p-4 mt-6 bg-blue-50 mx-3 rounded-lg">
        <h3 className="font-medium text-blue-800">Need Help?</h3>
        <p className="text-sm text-blue-600 mt-1">Our support team is just a click away.</p>
        <button className="mt-3 text-sm font-medium text-blue-700 hover:text-blue-800">
          Contact Support
        </button>
      </div>
    </aside>
  );
}