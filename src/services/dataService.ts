import axios from 'axios';

const API_URL = 'http://localhost:8082/api/v1';

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

class DataService {
  async getCourses(): Promise<Course[]> {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data.data;
  }

  async getCourse(courseId: string): Promise<Course> {
    const response = await axios.get(`${API_URL}/courses/${courseId}`);
    return response.data.data;
  }

  async addCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    const response = await axios.post(`${API_URL}/courses`, courseData);
    return response.data.data;
  }

  async updateCourse(courseId: string, courseData: Partial<Course>): Promise<Course> {
    const response = await axios.put(`${API_URL}/courses/${courseId}`, courseData);
    return response.data.data;
  }

  async deleteCourse(courseId: string): Promise<void> {
    await axios.delete(`${API_URL}/courses/${courseId}`);
  }

  async getLessons(courseId: string): Promise<Lesson[]> {
    const response = await axios.get(`${API_URL}/courses/${courseId}/lessons`);
    return response.data.data;
  }

  async addLesson(courseId: string, lessonData: Omit<Lesson, 'id' | 'course_id'>): Promise<Lesson> {
    const response = await axios.post(`${API_URL}/courses/${courseId}/lessons`, lessonData);
    return response.data.data;
  }

  async updateLesson(courseId: string, lessonId: string, lessonData: Partial<Lesson>): Promise<Lesson> {
    const response = await axios.put(`${API_URL}/courses/${courseId}/lessons/${lessonId}`, lessonData);
    return response.data.data;
  }

  async deleteLesson(courseId: string, lessonId: string): Promise<void> {
    await axios.delete(`${API_URL}/courses/${courseId}/lessons/${lessonId}`);
  }

  async exportData(): Promise<string> {
    const courses = await this.getCourses();
    return JSON.stringify(courses, null, 2);
  }
}

export const dataService = new DataService();