
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Course, Lesson } from '@/pages/Index';
import { LessonContent } from '@/components/LessonContent';
import { CommentSection } from '@/components/CommentSection';

interface CourseViewProps {
  course: Course;
  selectedLesson: Lesson | null;
  onLessonSelect: (lesson: Lesson) => void;
}

export function CourseView({ course, selectedLesson, onLessonSelect }: CourseViewProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const toggleLessonComplete = (lessonId: string) => {
    const newCompleted = new Set(completedLessons);
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId);
    } else {
      newCompleted.add(lessonId);
    }
    setCompletedLessons(newCompleted);
  };

  const currentLessonIndex = selectedLesson 
    ? course.lessons.findIndex(l => l.id === selectedLesson.id)
    : 0;

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      onLessonSelect(course.lessons[currentLessonIndex - 1]);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      onLessonSelect(course.lessons[currentLessonIndex + 1]);
    }
  };

  return (
    <div className="pt-16 flex min-h-screen bg-white dark:bg-slate-900">
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-40 w-80 bg-gray-50 dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out pt-16 lg:pt-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {course.title}
            </h2>
            <Badge variant={course.difficulty === 'Beginner' ? 'default' : 'destructive'}>
              {course.difficulty}
            </Badge>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>Progress</span>
                <span>{completedLessons.size}/{course.lessons.length}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedLessons.size / course.lessons.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Lessons
            </h3>
            <div className="space-y-2">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`
                    group flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200
                    ${selectedLesson?.id === lesson.id 
                      ? 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500' 
                      : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                    }
                  `}
                  onClick={() => onLessonSelect(lesson)}
                >
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h4 className={`
                        text-sm font-medium transition-colors
                        ${selectedLesson?.id === lesson.id 
                          ? 'text-blue-700 dark:text-blue-300' 
                          : 'text-gray-900 dark:text-white'
                        }
                      `}>
                        {lesson.title}
                      </h4>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`
                      ml-2 w-6 h-6 p-0 rounded-full
                      ${completedLessons.has(lesson.id) 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500'
                      }
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLessonComplete(lesson.id);
                    }}
                  >
                    {completedLessons.has(lesson.id) && <Check className="w-3 h-3" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="ml-2">{isSidebarOpen ? 'Close' : 'Lessons'}</span>
          </Button>
        </div>

        {/* Lesson Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedLesson ? (
            <div className="max-w-4xl mx-auto p-6 lg:p-8">
              <LessonContent lesson={selectedLesson} />
              
              <Separator className="my-8" />
              
              {/* Lesson Navigation */}
              <div className="flex justify-between items-center mb-8">
                <Button
                  variant="outline"
                  onClick={goToPreviousLesson}
                  disabled={currentLessonIndex === 0}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>
                
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Lesson {currentLessonIndex + 1} of {course.lessons.length}
                </span>
                
                <Button
                  variant="outline"
                  onClick={goToNextLesson}
                  disabled={currentLessonIndex === course.lessons.length - 1}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <Separator className="my-8" />
              
              {/* Comments Section */}
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <MessageCircle className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Discussion
                  </h3>
                </div>
                <CommentSection lessonId={selectedLesson.id} />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Select a lesson to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
