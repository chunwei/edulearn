import React, { useState } from 'react';
import {
  Menu,
  X,
  Search,
  Bell,
  UserCircle2,
  BookOpen,
  GraduationCap,
  Code,
  Palette,
  Music,
  Calculator,
  Brain,
  LibraryBig
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '../ui/navigation-menu'
import { cn } from '@/lib/utils'
import { NavUser } from './NavUser'
import { ThemeSwitch } from './ThemeSwitch'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'

/**
 * 课程分类数据
 */
const courseCategories = [
  {
    title: 'Programming & Development',
    description:
      'Learn programming languages, web development, mobile app development and more',
    icon: Code,
    href: '/courses/programming'
  },
  {
    title: 'Design & Creativity',
    description: 'Explore UI/UX design, graphic design, digital art and more',
    icon: Palette,
    href: '/courses/design'
  },
  {
    title: 'Music & Arts',
    description:
      'Discover music theory, instrument playing, vocal training and more',
    icon: Music,
    href: '/courses/music'
  },
  {
    title: 'Math & Science',
    description: 'Dive into mathematics, physics, chemistry, biology and more',
    icon: Calculator,
    href: '/courses/math-science'
  }
]

/**
 * 课程难度级别数据
 */
const courseLevels = [
  {
    title: 'Beginner',
    description: 'Basic courses suitable for beginners',
    href: '/courses/beginner'
  },
  {
    title: 'Intermediate',
    description: 'Advanced courses requiring some basic knowledge',
    href: '/courses/intermediate'
  },
  {
    title: 'Advanced',
    description: 'Professional courses for experienced learners',
    href: '/courses/advanced'
  },
  {
    title: 'Expert',
    description: 'In-depth discussion of specialized professional courses',
    href: '/courses/expert'
  }
]

/**
 * ListItem组件用于渲染导航菜单中的列表项
 */
const ListItem = ({
  className,
  title,
  children,
  icon: Icon,
  ...props
}: React.ComponentProps<'a'> & {
  icon?: React.ComponentType<{ className: string }>
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          data-slot="list-item"
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {Icon && <Icon className="size-4" />}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex items-center justify-between gap-2 md:gap-4 h-[var(--header-height)]">
          <div className="flex items-center gap-6">
            <div className="shrink-0 flex items-center">
              <Link
                to="/dashboard"
                className="ml-4 mr-4 flex items-center gap-2 lg:mr-6 text-blue-600"
              >
                <LibraryBig className="size-6" />
                <span className="hidden font-bold lg:inline-block">
                  EduLearn
                </span>
              </Link>
            </div>

            {/* Navigation Menu - 桌面端显示 */}
            <div className="hidden sm:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/dashboard">
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Dashboard
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 md:w-[500px] lg:w-[600px]">
                        {/* 所有课程放在上方 */}
                        <NavigationMenuLink asChild>
                          <a
                            className="flex w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500/50 to-blue-900/50 p-6 no-underline outline-none focus:shadow-md"
                            href="/courses"
                          >
                            <BookOpen className="size-6 text-white" />
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              All Courses
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Browse all our courses and find the perfect
                              learning content for you
                            </p>
                          </a>
                        </NavigationMenuLink>

                        {/* 课程分类和难度级别在下方左右排列 */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div>
                            <h4 className="mb-2 text-sm font-medium leading-none flex items-center gap-1">
                              <GraduationCap className="size-4" /> Course
                              Categories
                            </h4>
                            <ul className="grid gap-2">
                              {courseCategories.map((category) => (
                                <ListItem
                                  key={category.title}
                                  title={category.title}
                                  href={category.href}
                                  icon={category.icon}
                                >
                                  {category.description}
                                </ListItem>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="mb-2 text-sm font-medium leading-none flex items-center gap-1">
                              <Brain className="size-4" /> Difficulty Levels
                            </h4>
                            <ul className="grid gap-2">
                              {courseLevels.map((level) => (
                                <ListItem
                                  key={level.title}
                                  title={level.title}
                                  href={level.href}
                                >
                                  {level.description}
                                </ListItem>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="/calendar">
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Calendar
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="/messages">
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Messages
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="size-4 text-gray-400" />
              </div>
              <Input
                type="text"
                className="w-full pl-10 pr-3 py-2  rounded-md leading-5  sm:text-sm"
                placeholder="Search"
              />
            </div>

            <Button variant="ghost" size="icon" className="ml-3 relative">
              <span className="sr-only">View notifications</span>
              <Bell className="size-4" />
              <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs p-0">
                2
              </Badge>
            </Button>

            <div className="ml-3">
              <ThemeSwitch />
            </div>
            <Separator orientation="vertical" className="!h-6 mx-3" />
            {user && <NavUser user={user} />}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block size-6" />
              ) : (
                <Menu className="block size-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/courses"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Courses
            </Link>
            <Link
              to="/calendar"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Calendar
            </Link>
            <Link
              to="/messages"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Messages
            </Link>
          </div>
          {user && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="shrink-0">
                  <Avatar className="size-10 rounded-full">
                    <AvatarImage
                      src={
                        user.avatar ||
                        'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=100'
                      }
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name ? (
                        user.name.substring(0, 1).toUpperCase()
                      ) : (
                        <UserCircle2 className="size-10 text-gray-400" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
                <button className="ml-auto shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="sr-only">View notifications</span>
                  <Bell className="size-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Your Profile
                </Link>
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  onClick={() => logout()}
                >
                  Sign out
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}