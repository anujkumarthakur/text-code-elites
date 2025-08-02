import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, Eye, Code, FileText, Users, BarChart3, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dataService, Course, Lesson, ContentBlock } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'lessons' | 'users'>('overview');
  const [showEditor, setShowEditor] = useState(false);
  const [showCourseEditor, setShowCourseEditor] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const { toast } = useToast();

  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const [newLesson, setNewLesson] = useState<Partial<Lesson>>({ title: '', content: '', codeBlocks: [] });
  const [newCourse, setNewCourse] = useState<Partial<Course>>({ title: '', description: '', difficulty: 'Beginner', icon: 'Code', lessons: [] });
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      loadLessons(selectedCourse.id);
    }
  }, [selectedCourse]);

  const loadCourses = async () => {
    try {
      const loadedCourses = await dataService.getCourses();
      setCourses(loadedCourses);
      if (!selectedCourse && loadedCourses.length > 0) {
        setSelectedCourse(loadedCourses[0]); // Select the first course by default
      }
    } catch (error) {
      console.error("Error loading courses:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data || error.message);
        toast({
          title: "Error loading courses",
          description: error.response?.data?.error || error.message,
          variant: "destructive",
        });
      }
    }
  };

  const loadLessons = async (courseId: string) => {
    try {
      const loadedLessons = await dataService.getLessons(courseId);
      setLessons(loadedLessons);
    } catch (error) {
      console.error("Error loading lessons:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data || error.message);
        toast({
          title: "Error loading lessons",
          description: error.response?.data?.error || error.message,
          variant: "destructive",
        });
      }
    }
  };

  const addContentBlock = (type: 'text' | 'code') => {
    const newBlock: ContentBlock = { id: Date.now().toString(), type, content: '', language: type === 'code' ? 'go' : undefined };
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const updateContentBlock = (id: string, content: string, language?: string) => {
    setContentBlocks(blocks => blocks.map(block => block.id === id ? { ...block, content, ...(language && { language }) } : block));
  };

  const removeContentBlock = (id: string) => {
    setContentBlocks(blocks => blocks.filter(block => block.id !== id));
  };

  const saveLesson = async () => {
    if (!selectedCourse || !newLesson.title) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const lessonData = { title: newLesson.title!, content: newLesson.content || '', codeBlocks: contentBlocks };

    try {
      if (editingLesson) {
        await dataService.updateLesson(selectedCourse.id, editingLesson.id, lessonData);
        toast({ title: "Success", description: "Lesson updated successfully" });
      } else {
        await dataService.addLesson(selectedCourse.id, lessonData);
        toast({ title: "Success", description: "Lesson created successfully" });
      }
      loadCourses(); // Reload courses to update lesson counts
      loadLessons(selectedCourse.id); // Reload lessons for the current course
      resetLessonEditor();
    } catch (error) {
      console.error("Error saving lesson:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data || error.message);
        toast({
          title: "Error saving lesson",
          description: error.response?.data?.error || error.message,
          variant: "destructive",
        });
      }
    }
  };

  const saveCourse = async () => {
    if (!newCourse.title || !newCourse.description) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    try {
      if (editingCourse) {
        await dataService.updateCourse(editingCourse.id, { title: newCourse.title!, description: newCourse.description!, difficulty: newCourse.difficulty!, icon: newCourse.icon! });
        toast({ title: "Success", description: "Course updated successfully" });
      } else {
        await dataService.addCourse({ title: newCourse.title!, description: newCourse.description!, difficulty: newCourse.difficulty!, icon: newCourse.icon!, lessons: [] });
        toast({ title: "Success", description: "Course created successfully" });
      }
      loadCourses();
      resetCourseEditor();
    } catch (error) {
      console.error("Error saving course:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data || error.message);
        toast({
          title: "Error saving course",
          description: error.response?.data?.error || error.message,
          variant: "destructive",
        });
      }
    }
  };

  const deleteCourse = async (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await dataService.deleteCourse(courseId);
        toast({ title: "Success", description: "Course deleted successfully" });
        loadCourses();
        if (selectedCourse?.id === courseId) setSelectedCourse(null);
      } catch (error) {
        console.error("Error deleting course:", error);
        if (axios.isAxiosError(error)) {
          console.error("Axios error details:", error.response?.data || error.message);
          toast({
            title: "Error deleting course",
            description: error.response?.data?.error || error.message,
            variant: "destructive",
          });
        }
      }
    }
  };

  const deleteLesson = async (courseId: string, lessonId: string) => {
    if (confirm('Are yous sure you want to delete this lesson?')) {
      try {
        await dataService.deleteLesson(courseId, lessonId);
        toast({ title: "Success", description: "Lesson deleted successfully" });
        loadLessons(courseId);
        loadCourses(); // To update lesson count on course card
      } catch (error) {
        console.error("Error deleting lesson:", error);
        if (axios.isAxiosError(error)) {
          console.error("Axios error details:", error.response?.data || error.message);
          toast({
            title: "Error deleting lesson",
            description: error.response?.data?.error || error.message,
            variant: "destructive",
          });
        }
      }
    }
  };

  const editCourse = (course: Course) => {
    setEditingCourse(course);
    setNewCourse({ title: course.title, description: course.description, difficulty: course.difficulty, icon: course.icon });
    setShowCourseEditor(true);
  };

  const editLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setNewLesson({ title: lesson.title, content: lesson.content });
    setContentBlocks(lesson.codeBlocks || []);
    setShowEditor(true);
  };

  const resetLessonEditor = () => {
    setNewLesson({ title: '', content: '', codeBlocks: [] });
    setContentBlocks([]);
    setShowEditor(false);
    setEditingLesson(null);
  };

  const resetCourseEditor = () => {
    setNewCourse({ title: '', description: '', difficulty: 'Beginner', icon: 'Code', lessons: [] });
    setShowCourseEditor(false);
    setEditingCourse(null);
  };

  const stats = [
    { name: 'Total Courses', value: courses.length.toString(), icon: FileText, color: 'text-blue-600' },
    { name: 'Total Lessons', value: courses.reduce((total, course) => total + course.lessons.length, 0).toString(), icon: Code, color: 'text-green-600' },
    { name: 'Active Users', value: '1,234', icon: Users, color: 'text-purple-600' },
    { name: 'Completion Rate', value: '78%', icon: BarChart3, color: 'text-orange-600' }
  ];

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <Button onClick={() => window.location.href = '/'} variant="outline"><Eye className="w-4 h-4 mr-2" />View Site</Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'courses', label: 'Courses', icon: FileText },
            { id: 'lessons', label: 'Lessons', icon: Code },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${activeTab === tab.id ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Manage Courses</h2>
              <Button onClick={() => { setEditingCourse(null); setNewCourse({ title: '', description: '', difficulty: 'Beginner', icon: 'Code', lessons: [] }); setShowCourseEditor(true); }}><Plus className="w-4 h-4 mr-2" />Add Course</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{course.lessons.length} lessons</p>
                    <Button onClick={() => { setSelectedCourse(course); setActiveTab('lessons'); }}>Manage Lessons</Button>
                    <Button onClick={() => editCourse(course)}>Edit</Button>
                    <Button onClick={() => deleteCourse(course.id)}>Delete</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Manage Lessons for {selectedCourse?.title}</h2>
              <Button onClick={() => { setEditingLesson(null); setNewLesson({ title: '', content: '', codeBlocks: [] }); setContentBlocks([]); setShowEditor(true); }} disabled={!selectedCourse}><Plus className="w-4 h-4 mr-2" />Add Lesson</Button>
            </div>
            {selectedCourse && (
              <div className="grid grid-cols-1 gap-4">
                {lessons.map((lesson) => (
                  <Card key={lesson.id}>
                    <CardHeader><CardTitle>{lesson.title}</CardTitle></CardHeader>
                    <CardContent>
                      <Button onClick={() => editLesson(lesson)}>Edit</Button>
                      <Button onClick={() => deleteLesson(selectedCourse.id, lesson.id)}>Delete</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {showEditor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold">{editingLesson ? 'Edit Lesson' : 'Create New Lesson'}</h3>
                <Button variant="ghost" size="sm" onClick={resetLessonEditor}><X className="w-4 h-4" /></Button>
              </div>
              <div className="p-6 space-y-6 overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium mb-2">Lesson Title</label>
                  <Input value={newLesson.title || ''} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} placeholder="Enter lesson title..." />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium">Content Blocks</label>
                    <div className="flex space-x-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => addContentBlock('text')}><FileText className="w-4 h-4 mr-1" />Add Text</Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => addContentBlock('code')}><Code className="w-4 h-4 mr-1" />Add Code</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {contentBlocks.map((block) => (
                      <div key={block.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge>{block.type === 'code' ? 'Code Block' : 'Text Block'}</Badge>
                          {block.type === 'code' ? (
                            <Select value={block.language || 'go'} onValueChange={(value) => updateContentBlock(block.id, block.content, value)}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="go">Go</SelectItem>
                                <SelectItem value="rust">Rust</SelectItem>
                                <SelectItem value="javascript">JavaScript</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : null /* Removed the extra Select here */}
                          <Button variant="ghost" size="sm" onClick={() => removeContentBlock(block.id)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                        {block.type === 'code' ? (
                          <Textarea value={block.content} onChange={(e) => updateContentBlock(block.id, e.target.value, block.language)} placeholder={`Enter ${block.type} content...`} className="min-h-[120px] font-mono text-sm" />
                        ) : (
                          <ReactQuill 
                            theme="snow" 
                            value={block.content} 
                            onChange={(value) => updateContentBlock(block.id, value)} 
                            modules={quillModules} 
                            formats={quillFormats}
                            className="w-full"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 p-6 border-t">
                <Button variant="outline" onClick={resetLessonEditor}>Cancel</Button>
                <Button onClick={saveLesson} disabled={!newLesson.title || contentBlocks.length === 0}><Save className="w-4 h-4 mr-2" />Save Lesson</Button>
              </div>
            </div>
          </div>
        )}

        {showCourseEditor && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold">{editingCourse ? 'Edit Course' : 'Create New Course'}</h3>
                <Button variant="ghost" size="sm" onClick={resetCourseEditor}><X className="w-4 h-4" /></Button>
              </div>
              <div className="p-6 space-y-6 overflow-y-auto">
                  <div>
                    <label className="block text-sm font-medium mb-2">Course Title *</label>
                    <Input value={newCourse.title || ''} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} placeholder="Enter course title..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Course Description *</label>
                    <Textarea value={newCourse.description || ''} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} placeholder="Enter course description..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                    <Select value={newCourse.difficulty || 'Beginner'} onValueChange={(value: 'Beginner' | 'Advanced') => setNewCourse({ ...newCourse, difficulty: value })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Course Icon</label>
                    <Select value={newCourse.icon || 'Code'} onValueChange={(value) => setNewCourse({ ...newCourse, icon: value })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Code">Code</SelectItem>
                        <SelectItem value="Zap">Zap</SelectItem>
                        <SelectItem value="Server">Server</SelectItem>
                        <SelectItem value="Rocket">Rocket</SelectItem>
                        <SelectItem value="Layers">Layers</SelectItem>
                        <SelectItem value="BookOpen">BookOpen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </div>
              <div className="flex items-center justify-end space-x-3 p-6 border-t">
                <Button variant="outline" onClick={resetCourseEditor}>Cancel</Button>
                <Button onClick={saveCourse} disabled={!newCourse.title || !newCourse.description}><Save className="w-4 h-4 mr-2" />{editingCourse ? 'Update Course' : 'Create Course'}</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
