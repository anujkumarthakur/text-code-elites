import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { CourseGrid } from '@/components/CourseGrid';
import { CourseView } from '@/components/CourseView';
import { Footer } from '@/components/Footer';
import { dataService } from '@/services/dataService';
import axios from 'axios';

export interface ContentBlock {
  id: string;
  type: 'text' | 'code';
  content: string;
  language?: string;
}

export interface Lesson {
  id: string;
  course_id: string;
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

const Index = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await dataService.getCourses();
        setCourses(fetchedCourses);
        if (!selectedCourse && fetchedCourses.length > 0) {
          setSelectedCourse(fetchedCourses[0]);
        }
        setFetchError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching courses:", error);
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.error || error.message;
          console.error("Axios error details:", error.response?.data || error.message);
          setFetchError(`Failed to load courses: ${errorMessage}`);
        } else {
          setFetchError("An unexpected error occurred while loading courses.");
        }
        setCourses([]); // Ensure courses array is empty on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-2xl font-semibold">Loading...</div>
          </div>
        ) : fetchError ? (
          <div className="flex items-center justify-center h-full text-red-500">
            <p>{fetchError}</p>
          </div>
        ) : selectedCourse ? (
          <CourseView
            course={selectedCourse}
            selectedLesson={selectedLesson}
            onLessonSelect={handleLessonSelect}
          />
        ) : (
          <div className="animate-fade-in">
            <CourseGrid courses={courses} onCourseSelect={handleCourseSelect} />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
