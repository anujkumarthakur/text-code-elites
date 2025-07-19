
# CodeMaster - Elite Text-Based Coding Course Platform

A comprehensive, modern learning platform specializing in **Golang**, **Advanced Golang**, **Rust**, **Advanced Rust**, and **Microservice REST API** development. Built with React, TypeScript, Tailwind CSS, and powered by a Golang Gin backend.

## 🚀 Features

### 🎯 Core Platform Features
- **Text-Centric Learning**: High-quality, in-depth textual explanations with minimal video content
- **5 Specialized Courses**: Go Fundamentals, Advanced Go, Rust Fundamentals, Advanced Rust, and Microservices
- **Interactive Code Blocks**: Syntax-highlighted code with copy-to-clipboard functionality
- **Responsive Design**: Flawless experience across desktop, tablet, and mobile devices
- **Dark/Light Mode**: User preference-based theming
- **Progress Tracking**: Mark lessons as complete and track learning progress

### 🎨 Modern UI/UX
- **Gradient Backgrounds**: Beautiful gradient backgrounds with subtle animations
- **Smooth Animations**: Fade-in, slide-up, and hover effects for enhanced user experience
- **Professional Design**: Clean, minimalist design with excellent typography
- **Mobile-First**: Responsive design optimized for all screen sizes
- **Accessibility**: Focus on keyboard navigation and screen reader compatibility

### 👥 Community Features
- **Lesson Comments**: Discussion system for each lesson
- **Nested Replies**: Multi-level comment threads
- **User Engagement**: Upvote/downvote system for helpful responses
- **Markdown Support**: Rich text formatting in comments

### ⚡ Admin Dashboard
- **Content Management**: Easy-to-use interface for creating and editing courses
- **Lesson Editor**: Rich text editor with code block support
- **User Management**: Track user progress and engagement
- **Analytics Dashboard**: Real-time statistics and insights
- **Course Organization**: Drag-and-drop lesson ordering

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tanstack Query** - Data fetching and state management
- **Shadcn/UI** - High-quality component library
- **Lucide React** - Beautiful icon library

### Backend
- **Go 1.21** - Fast, compiled programming language
- **Gin Framework** - High-performance HTTP web framework
- **CORS Support** - Cross-origin resource sharing
- **RESTful API** - Clean API design with proper HTTP methods
- **JSON Responses** - Structured API responses
- **PostgreSQL Ready** - Database abstraction ready for PostgreSQL integration

## 🏗 Project Structure

```
codemaster/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── ui/                 # Shadcn/UI components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── CourseGrid.tsx      # Course catalog
│   │   ├── CourseView.tsx      # Course and lesson viewer
│   │   ├── LessonContent.tsx   # Lesson content renderer
│   │   ├── CommentSection.tsx  # Community comments
│   │   ├── AdminDashboard.tsx  # Admin interface
│   │   └── Footer.tsx          # Site footer
│   ├── pages/                  # Page components
│   │   ├── Index.tsx           # Main application
│   │   └── NotFound.tsx        # 404 page
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   └── index.css               # Global styles and design system
├── backend/                     # Golang backend
│   ├── main.go                 # Main server file
│   ├── go.mod                  # Go module definition
│   └── go.sum                  # Go dependencies
├── public/                     # Static assets
├── index.html                  # HTML entry point
├── tailwind.config.ts          # Tailwind configuration
├── vite.config.ts             # Vite configuration
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Go** (v1.21 or higher)
- **npm** or **yarn**

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <your-git-url>
   cd codemaster
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Initialize Go module and install dependencies**
   ```bash
   go mod tidy
   ```

3. **Start the server**
   ```bash
   go run main.go
   ```
   The API will be available at `http://localhost:8080`

### API Health Check
Visit `http://localhost:8080/health` to verify the backend is running.

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api/v1
```

### Endpoints

#### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get specific course
- `POST /courses` - Create new course (Admin)
- `PUT /courses/:id` - Update course (Admin)
- `DELETE /courses/:id` - Delete course (Admin)

#### Lessons
- `GET /courses/:course_id/lessons` - Get lessons for a course
- `GET /lessons/:id` - Get specific lesson
- `POST /courses/:course_id/lessons` - Create new lesson (Admin)
- `PUT /lessons/:id` - Update lesson (Admin)
- `DELETE /lessons/:id` - Delete lesson (Admin)

#### Comments
- `GET /lessons/:lesson_id/comments` - Get lesson comments
- `POST /lessons/:lesson_id/comments` - Create comment
- `PUT /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

#### Users
- `GET /users` - Get all users (Admin)
- `GET /users/:id` - Get specific user
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user (Admin)

#### Admin
- `GET /admin/stats` - Get platform statistics
- `GET /admin/courses` - Get admin course data
- `GET /admin/users` - Get admin user data

## 🎨 Design System

### Colors
The platform uses a carefully crafted color palette:
- **Primary**: Blue to Purple gradients
- **Secondary**: Slate and Gray tones
- **Accent**: Yellow to Orange highlights
- **Semantic**: Green (success), Red (error), Orange (warning)

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Optimized for long-form reading
- **Code**: Monospace with syntax highlighting

### Animations
- **Fade In**: Smooth content loading
- **Slide Up**: Element transitions
- **Hover Effects**: Interactive feedback
- **Gradient Shifts**: Dynamic color changes

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=CodeMaster
```

### Database Setup (Future)
The backend is prepared for PostgreSQL integration:
1. Install PostgreSQL
2. Create database: `codemaster_db`
3. Update connection string in `main.go`
4. Run migrations (to be added)

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in your hosting provider

### Backend (Heroku/DigitalOcean)
1. Create a `Dockerfile` for containerization
2. Set up PostgreSQL database
3. Configure environment variables
4. Deploy using your preferred platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📋 Roadmap

### Phase 1 (Current)
- ✅ Modern UI/UX design
- ✅ Course catalog and lesson viewer
- ✅ Admin dashboard
- ✅ Golang Gin backend
- ✅ Comment system

### Phase 2 (Next)
- 🔄 PostgreSQL integration
- 🔄 User authentication & authorization
- 🔄 Progress tracking and certificates
- 🔄 Advanced admin analytics
- 🔄 Email notifications

### Phase 3 (Future)
- 📝 Advanced code editor integration
- 📝 Interactive coding exercises
- 📝 Peer review system
- 📝 Mobile app development
- 📝 AI-powered learning assistance

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/UI** for the excellent component library
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **Gin Framework** for the fast HTTP web framework
- **React Team** for the amazing frontend library

---

**Built with ❤️ for the coding community**

*CodeMaster - Where Code Meets Excellence*
