import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { ShieldCheck, Bell, Palette, Lock, LogOut, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder for actual setting values - typically fetched and saved via API
interface UserSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  twoFactorEnabled: boolean;
}

export function SettingsPage() {
  const { user: authUser, logout } = useAuth();
  
  // Initialize with default or fetched settings
  const [settings, setSettings] = useState<UserSettings>(() => {
    // In a real app, fetch from backend or local storage
    const savedSettings = localStorage.getItem(`userSettings-${authUser?.id}`);
    return savedSettings ? JSON.parse(savedSettings) : {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      theme: 'system',
      language: 'en-US',
      twoFactorEnabled: false,
    };
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleSettingChange = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => {
        const newSettings = {...prev, [key]: value };
        // In a real app, debounce and save to backend
        localStorage.setItem(`userSettings-${authUser?.id}`, JSON.stringify(newSettings));
        return newSettings;
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }
    // In a real app, send currentPassword and newPassword to backend for verification and update
    console.log('Password change attempt:', { currentPassword, newPassword });
    setPasswordSuccess('Password changed successfully! (Mock)');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    // setTimeout(() => setPasswordSuccess(''), 3000);
  };

  if (!authUser) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <p className="text-xl">Please <Link to="/login" className="text-blue-600 hover:underline">log in</Link> to access settings.</p>
      </div>
    );
  }

  const themes = [{value: 'light', label: 'Light'}, {value: 'dark', label: 'Dark'}, {value: 'system', label: 'System Default'}];
  const languages = [{value: 'en-US', label: 'English (US)'}, {value: 'es-ES', label: 'Español'}, {value: 'fr-FR', label: 'Français'}];

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Settings</h1>
        <p className="text-lg text-gray-600">Manage your account preferences and security settings.</p>
      </header>

      {/* General Settings Section */}
      <section className="mb-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3 flex items-center">
            <Bell className="mr-3 h-6 w-6 text-blue-600"/> Notification Preferences
        </h2>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <label htmlFor="emailNotifications" className="text-gray-700">
                Email Notifications
                <p className="text-xs text-gray-500">Receive important updates via email.</p>
            </label>
            <Switch id="emailNotifications" checked={settings.emailNotifications} onCheckedChange={(val) => handleSettingChange('emailNotifications', val)} />
          </div>
          {/* Add SMS and Push notifications similarly if Switch component is available */}
          <div className="flex items-center justify-between">
            <label htmlFor="pushNotifications" className="text-gray-700">
                Push Notifications
                <p className="text-xs text-gray-500">Get real-time alerts on your device. (Requires App)</p>
            </label>
            <Switch id="pushNotifications" checked={settings.pushNotifications} onCheckedChange={(val) => handleSettingChange('pushNotifications', val)} />
          </div>
        </div>
      </section>

      {/* Appearance Settings */}
      <section className="mb-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3 flex items-center">
            <Palette className="mr-3 h-6 w-6 text-purple-600"/> Appearance
        </h2>
        <div className="space-y-5">
            <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                <Select value={settings.theme} onValueChange={(val) => handleSettingChange('theme', val as UserSettings['theme'])}>
                    <SelectTrigger id="theme" className="w-full"><SelectValue placeholder="Select theme" /></SelectTrigger>
                    <SelectContent>
                        {themes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <Select value={settings.language} onValueChange={(val: string) => handleSettingChange('language', val)}>
                    <SelectTrigger id="language" className="w-full"><SelectValue placeholder="Select language" /></SelectTrigger>
                    <SelectContent>
                        {languages.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
        </div>
      </section>

      {/* Security Settings Section */}
      <section className="mb-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3 flex items-center">
            <ShieldCheck className="mr-3 h-6 w-6 text-green-600"/> Account Security
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
            <Input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="mt-1"/>
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
            <Input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="mt-1"/>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <Input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1"/>
          </div>
          {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
          {passwordSuccess && <p className="text-sm text-green-600">{passwordSuccess}</p>}
          <Button type="submit" className="flex items-center">
            <Lock className="mr-2 h-4 w-4"/> Change Password
          </Button>
        </form>
        <div className="mt-6 pt-6 border-t">
             <div className="flex items-center justify-between">
                <label htmlFor="twoFactorEnabled" className="text-gray-700">
                    Two-Factor Authentication (2FA)
                    <p className="text-xs text-gray-500">Enhance your account security.</p>
                </label>
                <Switch id="twoFactorEnabled" checked={settings.twoFactorEnabled} onCheckedChange={(val) => handleSettingChange('twoFactorEnabled', val)} />
            </div>
        </div>
      </section>

      <div className="mt-12 text-center">
        <Button variant="danger" onClick={logout} className="flex items-center mx-auto">
            <LogOut className="mr-2 h-5 w-5"/> Log Out
        </Button>
      </div>
    </div>
  );
} 