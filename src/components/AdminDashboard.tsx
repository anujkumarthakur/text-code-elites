
import { useState } from 'react';
import { Plus, Edit, Trash2, Save, Eye, Code, FileText, Users, BarChart3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface ContentBlock {
  id: string;
  type: 'text' | 'code';
  content: string;
  language?: string;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  codeBlocks: ContentBlock[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Advanced';
  lessons: Lesson[];
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'lessons' | 'users'>('overview');
  const [showEditor, setShowEditor] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  // Mock data - in real app, this would come from backend
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Go Fundamentals',
      description: 'Master the fundamentals of Go programming language',
      difficulty: 'Beginner',
      lessons: [
        {
          id: '1-1',
          title: 'Introduction to Go',
          content: 'Welcome to Go programming...',
          codeBlocks: []
        }
      ]
    }
  ]);

  const [newLesson, setNewLesson] = useState<Partial<Lesson>>({
    title: '',
    content: '',
    codeBlocks: []
  });

  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);

  const addContentBlock = (type: 'text' | 'code') => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: '',
      language: type === 'code' ? 'go' : undefined
    };
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const updateContentBlock = (id: string, content: string, language?: string) => {
    setContentBlocks(blocks => 
      blocks.map(block => 
        block.id === id 
          ? { ...block, content, ...(language && { language }) }
          : block
      )
    );
  };

  const removeContentBlock = (id: string) => {
    setContentBlocks(blocks => blocks.filter(block => block.id !== id));
  };

  const saveLesson = () => {
    if (!selectedCourse || !newLesson.title) return;

    const lesson: Lesson = {
      id: Date.now().toString(),
      title: newLesson.title!,
      content: newLesson.content || '',
      codeBlocks: contentBlocks
    };

    setCourses(courses => 
      courses.map(course => 
        course.id === selectedCourse.id
          ? { ...course, lessons: [...course.lessons, lesson] }
          : course
      )
    );

    // Reset form
    setNewLesson({ title: '', content: '', codeBlocks: [] });
    setContentBlocks([]);
    setShowEditor(false);
  };

  const stats = [
    { name: 'Total Courses', value: '5', icon: FileText, color: 'text-blue-600' },
    { name: 'Total Lessons', value: '47', icon: Code, color: 'text-green-600' },
    { name: 'Active Users', value: '1,234', icon: Users, color: 'text-purple-600' },
    { name: 'Completion Rate', value: '78%', icon: BarChart3, color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <Badge variant="secondary">CodeMaster Platform</Badge>
            </div>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Site
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'courses', label: 'Courses', icon: FileText },
            { id: 'lessons', label: 'Lessons', icon: Code },
            { id: 'users', label: 'Users', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.name} className="bg-white dark:bg-slate-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {stat.name}
                          </p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                          </p>
                        </div>
                        <Icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Activity */}
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and user interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'New user registered', user: 'John Doe', time: '2 hours ago' },
                    { action: 'Lesson completed', user: 'Jane Smith', time: '4 hours ago' },
                    { action: 'New comment posted', user: 'Mike Johnson', time: '6 hours ago' },
                    { action: 'Course progress updated', user: 'Sarah Wilson', time: '8 hours ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          by {activity.user}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Courses</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge variant={course.difficulty === 'Beginner' ? 'default' : 'destructive'}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span>{course.lessons.length} lessons</span>
                      <span>Active</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedCourse(course);
                          setActiveTab('lessons');
                        }}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Lessons</h2>
                {selectedCourse && (
                  <p className="text-gray-500 dark:text-gray-400">Course: {selectedCourse.title}</p>
                )}
              </div>
              <Button
                onClick={() => setShowEditor(true)}
                className="bg-green-600 hover:bg-green-700"
                disabled={!selectedCourse}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Lesson
              </Button>
            </div>

            {selectedCourse && (
              <div className="grid grid-cols-1 gap-4">
                {selectedCourse.lessons.map((lesson, index) => (
                  <Card key={lesson.id} className="bg-white dark:bg-slate-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {lesson.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {lesson.codeBlocks.length} code blocks
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!selectedCourse && (
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-12 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a Course
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose a course from the Courses tab to manage its lessons.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
            <Card className="bg-white dark:bg-slate-800">
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  User Management
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  User management features will be available once backend integration is complete.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Lesson Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Lesson
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEditor(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Lesson Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Lesson Title
                </label>
                <input
                  type="text"
                  value={newLesson.title || ''}
                  onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  placeholder="Enter lesson title..."
                />
              </div>

              {/* Content Blocks */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Content Blocks
                  </label>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addContentBlock('text')}
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      Add Text
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addContentBlock('code')}
                    >
                      <Code className="w-4 h-4 mr-1" />
                      Add Code
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {contentBlocks.map((block, index) => (
                    <div key={block.id} className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant={block.type === 'code' ? 'default' : 'secondary'}>
                            {block.type === 'code' ? 'Code Block' : 'Text Block'}
                          </Badge>
                          {block.type === 'code' && (
                            <select
                              value={block.language || 'go'}
                              onChange={(e) => updateContentBlock(block.id, block.content, e.target.value)}
                              className="text-xs px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            >
                              <option value="go">Go</option>
                              <option value="rust">Rust</option>
                              <option value="javascript">JavaScript</option>
                              <option value="typescript">TypeScript</option>
                              <option value="json">JSON</option>
                              <option value="yaml">YAML</option>
                            </select>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeContentBlock(block.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Textarea
                        value={block.content}
                        onChange={(e) => updateContentBlock(block.id, e.target.value, block.language)}
                        placeholder={block.type === 'code' ? 'Enter your code here...' : 'Enter your text content here...'}
                        className="min-h-[120px] font-mono text-sm"
                      />
                    </div>
                  ))}

                  {contentBlocks.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No content blocks yet. Add text or code blocks to build your lesson.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-slate-700">
              <Button
                variant="outline"
                onClick={() => setShowEditor(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={saveLesson}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!newLesson.title || contentBlocks.length === 0}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Lesson
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
