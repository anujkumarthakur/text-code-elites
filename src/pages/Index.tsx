
import { useState } from 'react';
import { Header } from '@/components/Header';
import { CourseGrid } from '@/components/CourseGrid';
import { CourseView } from '@/components/CourseView';
import { Footer } from '@/components/Footer';

export interface ContentBlock {
  id: string;
  type: 'text' | 'code';
  content: string;
  language?: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeBlocks: ContentBlock[];
  completed?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Advanced';
  lessons: Lesson[];
  createdAt?: string;
  updatedAt?: string;
}

// Legacy interface for backward compatibility
export interface CodeBlock {
  id: string;
  language: string;
  code: string;
}

const Index = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setSelectedLesson(course.lessons[0] || null);
  };

  const handleBackToHome = () => {
    setSelectedCourse(null);
    setSelectedLesson(null);
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
      <Header 
        selectedCourse={selectedCourse} 
        onBackToHome={handleBackToHome}
      />
      
      <main className="flex-1">
        {!selectedCourse ? (
          <div className="animate-fade-in">
            <CourseGrid onCourseSelect={handleCourseSelect} />
          </div>
        ) : (
          <CourseView
            course={selectedCourse}
            selectedLesson={selectedLesson}
            onLessonSelect={handleLessonSelect}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
