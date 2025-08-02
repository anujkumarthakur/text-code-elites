import { useState, useEffect } from 'react';
import { Code, Zap, Server, Rocket, Layers, BookOpen, Mail, Star, Users, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Course } from '@/pages/Index';
import { dataService } from '@/services/dataService';

interface CourseGridProps {
  onCourseSelect: (course: Course) => void;
}

const iconMap = {
  Code, 
  Zap, 
  Server,
  Rocket,
  Layers,
  BookOpen,
  Mail
};

export function CourseGrid({ onCourseSelect }: CourseGridProps) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Load courses from data service and convert to expected format
    const loadedCourses = dataService.getCourses();
    const convertedCourses: Course[] = loadedCourses.map(course => ({
      ...course,
      lessons: course.lessons.map(lesson => ({
        ...lesson,
        codeBlocks: lesson.codeBlocks || []
      }))
    }));
    setCourses(convertedCourses);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-slate-900/50 dark:to-slate-800/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
              Master <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Modern</span> Programming
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 dark:text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-up">
              Learn programming through comprehensive, hands-on courses designed by industry experts. 
              Build production-ready skills with real-world projects and interactive examples.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 mb-12 animate-fade-in">
              <div className="flex items-center text-blue-100 dark:text-slate-300">
                <Users className="w-6 h-6 mr-2 text-yellow-400" />
                <span className="text-lg font-medium">50,000+ Students</span>
              </div>
              <div className="flex items-center text-blue-100 dark:text-slate-300">
                <Star className="w-6 h-6 mr-2 text-yellow-400" />
                <span className="text-lg font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center text-blue-100 dark:text-slate-300">
                <Clock className="w-6 h-6 mr-2 text-yellow-400" />
                <span className="text-lg font-medium">Self-Paced Learning</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 animate-bounce-soft"
            >
              Start Learning Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-16 left-1/4 w-12 h-12 bg-blue-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Course Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up">
            From beginner fundamentals to advanced concepts, our courses are crafted to take you from zero to expert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {courses.map((course, index) => {
            const IconComponent = iconMap[course.icon as keyof typeof iconMap];
            return (
              <Card 
                key={course.id} 
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onCourseSelect(course)}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 group-hover:from-purple-500 group-hover:to-indigo-600 transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <Badge 
                      variant={course.difficulty === 'Beginner' ? 'default' : 'destructive'}
                      className="px-3 py-1 font-medium"
                    >
                      {course.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6">
                    {course.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {course.lessons.length} Lessons
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Self-paced
                    </span>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 rounded-lg transition-all duration-300 group-hover:shadow-lg"
                  >
                    Start Course
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-8 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Hands-on Coding</h3>
            <p className="text-gray-600 dark:text-gray-300">Learn by doing with practical examples and real-world projects that build your portfolio.</p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Expert Community</h3>
            <p className="text-gray-600 dark:text-gray-300">Connect with fellow learners and industry experts in our vibrant learning community.</p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Industry Recognition</h3>
            <p className="text-gray-600 dark:text-gray-300">Get certificates and build skills that are recognized by top tech companies worldwide.</p>
          </div>
        </div>
      </section>
    </div>
  );
}