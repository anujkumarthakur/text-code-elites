import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users, Zap, BookOpen } from 'lucide-react';

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 py-20 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Join Our Vibrant Community!</h1>
            <p className="text-lg md:text-xl mb-8 animate-slide-up">
              Connect with fellow learners, ask questions, share insights, and grow together on your coding journey.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-soft"
              onClick={() => alert('Joining the community!')}
            >
              Get Started Now
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">What You'll Find</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg animate-fade-in">
              <CardHeader>
                <MessageSquare className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Discussion Forums</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">Ask questions, share solutions, and engage in deep discussions on various coding topics and courses.</p>
                <Button variant="link" className="mt-4">Browse Forums</Button>
              </CardContent>
            </Card>
            <Card className="text-center p-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Study Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">Form or join study groups to collaborate on projects, prepare for exams, or learn new concepts together.</p>
                <Button variant="link" className="mt-4">Find a Group</Button>
              </CardContent>
            </Card>
            <Card className="text-center p-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <Zap className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Live Q&A Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">Participate in live sessions with instructors and experts to get your questions answered in real-time.</p>
                <Button variant="link" className="mt-4">View Schedule</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action / Join Section */}
        <section className="bg-gray-100 dark:bg-slate-800 py-16 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ready to Connect?</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Join our official Discord server for real-time chat, announcements, and direct support.
            </p>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => alert('Redirecting to Discord!')}
            >
              Join Our Discord
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityPage;