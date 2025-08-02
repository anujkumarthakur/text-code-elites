// Data service for handling course data persistence to JSON files
// This simulates backend functionality using localStorage and JSON

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
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Advanced';
  lessons: Lesson[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'coursemaster_data';

// Default courses data
const defaultCourses: Course[] = [
  {
    id: '1',
    title: 'Go Fundamentals',
    description: 'Master the fundamentals of Go programming language with hands-on examples and real-world projects.',
    icon: 'Code',
    difficulty: 'Beginner',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lessons: [
      {
        id: '1-1',
        title: 'Introduction to Go',
        content: `# Welcome to Go Programming

Go (also known as Golang) is a statically typed, compiled programming language designed by Google. It's known for its simplicity, efficiency, and excellent support for concurrent programming.

## Why Learn Go?

- **Simple syntax**: Easy to learn and read
- **Fast compilation**: Quick build times
- **Built-in concurrency**: Goroutines and channels
- **Strong standard library**: Comprehensive built-in packages
- **Cross-platform**: Runs on multiple operating systems`,
        codeBlocks: [
          {
            id: 'cb1',
            type: 'code',
            language: 'go',
            content: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`
          }
        ]
      },
      {
        id: '1-2',
        title: 'Variables and Data Types',
        content: `# Variables and Data Types in Go

Understanding Go's type system is fundamental to writing effective Go programs.

## Variable Declaration

Go provides multiple ways to declare variables:`,
        codeBlocks: [
          {
            id: 'cb2',
            type: 'code',
            language: 'go',
            content: `// Explicit Declaration
var name string
var age int
var isActive bool

// Declaration with Initialization
var name string = "John"
var age int = 25
var isActive bool = true

// Short Declaration (Inside Functions)
name := "John"
age := 25
isActive := true`
          }
        ]
      }
    ]
  }
];

class DataService {
  // Get all courses
  getCourses(): Course[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      // Initialize with default data if nothing exists
      this.saveCourses(defaultCourses);
      return defaultCourses;
    } catch (error) {
      console.error('Error loading courses:', error);
      return defaultCourses;
    }
  }

  // Save all courses
  saveCourses(courses: Course[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses, null, 2));
    } catch (error) {
      console.error('Error saving courses:', error);
    }
  }

  // Get a specific course
  getCourse(courseId: string): Course | null {
    const courses = this.getCourses();
    return courses.find(course => course.id === courseId) || null;
  }

  // Add a new course
  addCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Course {
    const courses = this.getCourses();
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    courses.push(newCourse);
    this.saveCourses(courses);
    return newCourse;
  }

  // Update an existing course
  updateCourse(courseId: string, courseData: Partial<Course>): Course | null {
    const courses = this.getCourses();
    const courseIndex = courses.findIndex(course => course.id === courseId);
    
    if (courseIndex === -1) return null;
    
    courses[courseIndex] = {
      ...courses[courseIndex],
      ...courseData,
      updatedAt: new Date().toISOString(),
    };
    
    this.saveCourses(courses);
    return courses[courseIndex];
  }

  // Delete a course
  deleteCourse(courseId: string): boolean {
    const courses = this.getCourses();
    const filteredCourses = courses.filter(course => course.id !== courseId);
    
    if (filteredCourses.length === courses.length) return false;
    
    this.saveCourses(filteredCourses);
    return true;
  }

  // Add a lesson to a course
  addLesson(courseId: string, lessonData: Omit<Lesson, 'id'>): Lesson | null {
    const courses = this.getCourses();
    const courseIndex = courses.findIndex(course => course.id === courseId);
    
    if (courseIndex === -1) return null;
    
    const newLesson: Lesson = {
      ...lessonData,
      id: `${courseId}-${Date.now()}`,
    };
    
    courses[courseIndex].lessons.push(newLesson);
    courses[courseIndex].updatedAt = new Date().toISOString();
    
    this.saveCourses(courses);
    return newLesson;
  }

  // Update a lesson
  updateLesson(courseId: string, lessonId: string, lessonData: Partial<Lesson>): Lesson | null {
    const courses = this.getCourses();
    const courseIndex = courses.findIndex(course => course.id === courseId);
    
    if (courseIndex === -1) return null;
    
    const lessonIndex = courses[courseIndex].lessons.findIndex(lesson => lesson.id === lessonId);
    
    if (lessonIndex === -1) return null;
    
    courses[courseIndex].lessons[lessonIndex] = {
      ...courses[courseIndex].lessons[lessonIndex],
      ...lessonData,
    };
    
    courses[courseIndex].updatedAt = new Date().toISOString();
    
    this.saveCourses(courses);
    return courses[courseIndex].lessons[lessonIndex];
  }

  // Delete a lesson
  deleteLesson(courseId: string, lessonId: string): boolean {
    const courses = this.getCourses();
    const courseIndex = courses.findIndex(course => course.id === courseId);
    
    if (courseIndex === -1) return false;
    
    const originalLength = courses[courseIndex].lessons.length;
    courses[courseIndex].lessons = courses[courseIndex].lessons.filter(lesson => lesson.id !== lessonId);
    
    if (courses[courseIndex].lessons.length === originalLength) return false;
    
    courses[courseIndex].updatedAt = new Date().toISOString();
    this.saveCourses(courses);
    return true;
  }

  // Export data as JSON string
  exportData(): string {
    const courses = this.getCourses();
    return JSON.stringify(courses, null, 2);
  }

  // Import data from JSON string
  importData(jsonData: string): boolean {
    try {
      const courses = JSON.parse(jsonData);
      if (Array.isArray(courses)) {
        this.saveCourses(courses);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}

export const dataService = new DataService();