import React from 'react';
import { Link } from 'react-router-dom';
import { mockCourses } from '../data/mockData';
import { Course } from '../types'; // Corrected import for Course type
// import { useAuth } from '../contexts/AuthContext'; // Removed unused import
import { Button } from '../components/ui/button'; // Corrected case
import { Input } from '../components/ui/input'; // Corrected case
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'; // Using new Select
import { Search, Filter, LayoutGrid, List } from 'lucide-react';
import { CourseCard } from '../components/courses/CourseCard'; // Using new CourseCard

// Placeholder for CourseCard component - should be created separately
// const CourseCard: React.FC<{ course: Course }> = ({ course }) => ( 
//   <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
// ... (CourseCard implementation removed as it's now imported)
//   </div>
// );

export function CoursesListPage() {
  // const { user } = useAuth(); // Removed unused variable
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [levelFilter, setLevelFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('rating');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const filteredCourses: Course[] = mockCourses
    .filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(course => categoryFilter === 'all' || course.category === categoryFilter)
    .filter(course => levelFilter === 'all' || course.level === levelFilter)
    .sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'enrollment') return (b.enrollmentCount || 0) - (a.enrollmentCount || 0);
      return 0;
    });

  const categories = ['all', ...new Set(mockCourses.map(c => c.category))];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Explore Courses</h1>
        <p className="text-lg text-gray-600">Find your next learning adventure from our extensive catalog.</p>
      </header>

      {/* Filters and Search Bar */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow sticky top-16 z-10 border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Courses</label>
            <div className="relative">
              <Input
                id="search"
                type="text"
                placeholder="Search by title, description, or instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <select 
                id="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
            </select> */}
          </div>
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger id="level" className="w-full">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                {levels.map(lvl => (
                  <SelectItem key={lvl} value={lvl}>{lvl === 'all' ? 'All Levels' : lvl.charAt(0).toUpperCase() + lvl.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <select 
                id="level"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
                {levels.map(lvl => (
                    <option key={lvl} value={lvl}>{lvl === 'all' ? 'All Levels' : lvl.charAt(0).toUpperCase() + lvl.slice(1)}</option>
                ))}
            </select> */}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 items-end">
            <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort" className="w-full">
                    <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="enrollment">Popularity</SelectItem>
                </SelectContent>
                </Select>
                {/* <select 
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    <option value="rating">Rating</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="enrollment">Popularity</option>
                </select> */}
            </div>
            <div className="flex justify-end items-center space-x-2 pt-6">
                <span className="text-sm text-gray-600">View:</span>
                <Button variant={viewMode === 'grid' ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode('grid')} title="Grid View"> 
                    <LayoutGrid className="h-5 w-5" />
                </Button>
                <Button variant={viewMode === 'list' ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode('list')} title="List View"> 
                    <List className="h-5 w-5" />
                </Button>
            </div>
        </div>
      </div>

      {/* Course Grid/List */}
      {filteredCourses.length > 0 ? (
        viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
            </div>
        ) : (
            <div className="space-y-6">
                {filteredCourses.map(course => (
                     <div key={course.id} className="bg-white shadow-md rounded-lg overflow-hidden flex hover:shadow-lg transition-shadow duration-200">
                        <img src={course.thumbnail || 'https://via.placeholder.com/200x120?text=Course'} alt={course.title} className="w-1/3 h-auto object-cover hidden md:block"/>
                        <div className="p-4 flex-grow">
                            <Link to={`/courses/${course.id}`} className="block mb-1">
                                <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-700">{course.title}</h3>
                            </Link>
                            <p className="text-sm text-gray-600 mb-2">By {course.instructor.name}</p>
                            <p className="text-sm text-gray-500 mb-3 h-12 overflow-hidden">{course.description}</p>
                            <div className="flex justify-between items-center text-sm mb-3">
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${course.level === 'beginner' ? 'bg-green-100 text-green-700' : course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                                </span>
                                <span className="font-bold text-gray-700">${course.price}</span>
                            </div>
                            <div className="text-xs text-gray-500 mb-3">{course.duration} &bull; {course.enrollmentCount} students &bull; Rating: {course.rating}/5</div>
                            <Button variant="outline" size="sm"> 
                                <Link to={`/courses/${course.id}`}>View Details</Link>
                            </Button>
                            <Button size="sm" className="ml-2" onClick={() => alert(`Enrolling in ${course.title}`)}>Enroll Now</Button> 
                        </div>
                    </div>
                ))}
            </div>
        )
      ) : (
        <div className="text-center py-12">
          <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Courses Found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
} 