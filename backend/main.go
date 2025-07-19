
package main

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Models - these will be replaced with database models later
type Course struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Icon        string   `json:"icon"`
	Difficulty  string   `json:"difficulty"`
	Lessons     []Lesson `json:"lessons"`
	CreatedAt   string   `json:"created_at"`
	UpdatedAt   string   `json:"updated_at"`
}

type Lesson struct {
	ID         string        `json:"id"`
	CourseID   string        `json:"course_id"`
	Title      string        `json:"title"`
	Content    string        `json:"content"`
	CodeBlocks []CodeBlock   `json:"code_blocks"`
	Order      int           `json:"order"`
	Completed  bool          `json:"completed,omitempty"`
	CreatedAt  string        `json:"created_at"`
	UpdatedAt  string        `json:"updated_at"`
}

type CodeBlock struct {
	ID       string `json:"id"`
	Language string `json:"language"`
	Code     string `json:"code"`
	Order    int    `json:"order"`
}

type Comment struct {
	ID        string `json:"id"`
	LessonID  string `json:"lesson_id"`
	UserID    string `json:"user_id"`
	Content   string `json:"content"`
	Author    string `json:"author"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type User struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Role      string `json:"role"` // "user" or "admin"
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

// In-memory storage (will be replaced with PostgreSQL)
var courses []Course
var comments []Comment
var users []User

func main() {
	// Initialize mock data
	initMockData()

	// Initialize Gin router
	r := gin.Default()

	// CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// API routes
	api := r.Group("/api/v1")
	{
		// Course routes
		api.GET("/courses", getCourses)
		api.GET("/courses/:id", getCourse)
		api.POST("/courses", createCourse)
		api.PUT("/courses/:id", updateCourse)
		api.DELETE("/courses/:id", deleteCourse)

		// Lesson routes
		api.GET("/courses/:course_id/lessons", getLessons)
		api.GET("/lessons/:id", getLesson)
		api.POST("/courses/:course_id/lessons", createLesson)
		api.PUT("/lessons/:id", updateLesson)
		api.DELETE("/lessons/:id", deleteLesson)

		// Comment routes  
		api.GET("/lessons/:lesson_id/comments", getComments)
		api.POST("/lessons/:lesson_id/comments", createComment)
		api.PUT("/comments/:id", updateComment)
		api.DELETE("/comments/:id", deleteComment)

		// User routes
		api.GET("/users", getUsers)
		api.GET("/users/:id", getUser)
		api.POST("/users", createUser)
		api.PUT("/users/:id", updateUser)
		api.DELETE("/users/:id", deleteUser)

		// Admin routes
		admin := api.Group("/admin")
		{
			admin.GET("/stats", getAdminStats)
			admin.GET("/courses", getAdminCourses)
			admin.GET("/users", getAdminUsers)
		}
	}

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"message": "CodeMaster API is running",
		})
	})

	log.Println("🚀 Server starting on http://localhost:8080")
	log.Fatal(r.Run(":8080"))
}

// Course handlers
func getCourses(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"data":    courses,
		"message": "Courses retrieved successfully",
	})
}

func getCourse(c *gin.Context) {
	id := c.Param("id")
	for _, course := range courses {
		if course.ID == id {
			c.JSON(http.StatusOK, gin.H{
				"data":    course,
				"message": "Course retrieved successfully",
			})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{
		"error": "Course not found",
	})
}

func createCourse(c *gin.Context) {
	var course Course
	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	course.ID = strconv.Itoa(len(courses) + 1)
	course.CreatedAt = "2024-01-01T00:00:00Z"
	course.UpdatedAt = "2024-01-01T00:00:00Z"
	courses = append(courses, course)

	c.JSON(http.StatusCreated, gin.H{
		"data":    course,
		"message": "Course created successfully",
	})
}

func updateCourse(c *gin.Context) {
	id := c.Param("id")
	var updatedCourse Course
	if err := c.ShouldBindJSON(&updatedCourse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	for i, course := range courses {
		if course.ID == id {
			updatedCourse.ID = id
			updatedCourse.CreatedAt = course.CreatedAt
			updatedCourse.UpdatedAt = "2024-01-01T00:00:00Z"
			courses[i] = updatedCourse
			c.JSON(http.StatusOK, gin.H{
				"data":    updatedCourse,
				"message": "Course updated successfully",
			})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{
		"error": "Course not found",
	})
}

func deleteCourse(c *gin.Context) {
	id := c.Param("id")
	for i, course := range courses {
		if course.ID == id {
			courses = append(courses[:i], courses[i+1:]...)
			c.JSON(http.StatusOK, gin.H{
				"message": "Course deleted successfully",
			})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{
		"error": "Course not found",
	})
}

// Lesson handlers
func getLessons(c *gin.Context) {
	courseID := c.Param("course_id")
	var lessons []Lesson
	
	for _, course := range courses {
		if course.ID == courseID {
			lessons = course.Lessons
			break
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    lessons,
		"message": "Lessons retrieved successfully",
	})
}

func getLesson(c *gin.Context) {
	id := c.Param("id")
	for _, course := range courses {
		for _, lesson := range course.Lessons {
			if lesson.ID == id {
				c.JSON(http.StatusOK, gin.H{
					"data":    lesson,
					"message": "Lesson retrieved successfully",
				})
				return
			}
		}
	}
	c.JSON(http.StatusNotFound, gin.H{
		"error": "Lesson not found",
	})
}

func createLesson(c *gin.Context) {
	courseID := c.Param("course_id")
	var lesson Lesson
	if err := c.ShouldBindJSON(&lesson); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	lesson.ID = strconv.Itoa(len(courses)*100 + len(courses))
	lesson.CourseID = courseID
	lesson.CreatedAt = "2024-01-01T00:00:00Z"
	lesson.UpdatedAt = "2024-01-01T00:00:00Z"

	// Add lesson to course
	for i, course := range courses {
		if course.ID == courseID {
			courses[i].Lessons = append(courses[i].Lessons, lesson)
			c.JSON(http.StatusCreated, gin.H{
				"data":    lesson,
				"message": "Lesson created successfully",
			})
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{
		"error": "Course not found",
	})
}

func updateLesson(c *gin.Context) {
	id := c.Param("id")
	var updatedLesson Lesson
	if err := c.ShouldBindJSON(&updatedLesson); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	for i, course := range courses {
		for j, lesson := range course.Lessons {
			if lesson.ID == id {
				updatedLesson.ID = id
				updatedLesson.CourseID = lesson.CourseID
				updatedLesson.CreatedAt = lesson.CreatedAt
				updatedLesson.UpdatedAt = "2024-01-01T00:00:00Z"
				courses[i].Lessons[j] = updatedLesson
				c.JSON(http.StatusOK, gin.H{
					"data":    updatedLesson,
					"message": "Lesson updated successfully",
				})
				return
			}
		}
	}
	c.JSON(http.StatusNotFound, gin.H{
		"error": "Lesson not found",
	})
}

func deleteLesson(c *gin.Context) {
	id := c.Param("id")
	for i, course := range courses {
		for j, lesson := range course.Lessons {
			if lesson.ID == id {
				courses[i].Lessons = append(courses[i].Lessons[:j], courses[i].Lessons[j+1:]...)
				c.JSON(http.StatusOK, gin.H{
					"message": "Lesson deleted successfully",
				})
				return
			}
		}
	}
	c.JSON(http.StatusNotFound, gin.H{
		"error": "Lesson not found",
	})
}

// Comment handlers
func getComments(c *gin.Context) {
	lessonID := c.Param("lesson_id")
	var lessonComments []Comment
	
	for _, comment := range comments {
		if comment.LessonID == lessonID {
			lessonComments = append(lessonComments, comment)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    lessonComments,
		"message": "Comments retrieved successfully",
	})
}

func createComment(c *gin.Context) {
	lessonID := c.Param("lesson_id")
	var comment Comment
	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	comment.ID = strconv.Itoa(len(comments) + 1)
	comment.LessonID = lessonID
	comment.CreatedAt = "2024-01-01T00:00:00Z"
	comment.UpdatedAt = "2024-01-01T00:00:00Z"
	comments = append(comments, comment)

	c.JSON(http.StatusCreated, gin.H{
		"data":    comment,
		"message": "Comment created successfully",
	})
}

func updateComment(c *gin.Context) {
	id := c.Param("id")
	var updatedComment Comment
	if err := c.ShouldBindJSON(&updatedComment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	for i, comment := range comments {
		if comment.ID == id {
			updatedComment.ID = id
			updatedComment.LessonID = comment.LessonID
			updatedComment.UserID = comment.UserID
			updatedComment.CreatedAt = comment.CreatedAt
			updatedComment.UpdatedAt = "2024-01-01T00:00:00Z"
			comments[i] = updatedComment
			c.JSON(http.StatusOK, gin.H{
				"data":    updatedComment,
				"message": "Comment updated successfully",
			})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{
		"error": "Comment not found",
	})
}

func deleteComment(c *gin.Context) {
	id := c.Param("id")
	for i, comment := range comments {
		if comment.ID == id {
			comments = append(comments[:i], comments[i+1:]...)
			c.JSON(http.StatusOK, gin.H{
				"message": "Comment deleted successfully",
			})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{
		"error": "Comment not found",
	})
}

// User handlers
func getUsers(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"data":    users,
		"message": "Users retrieved successfully",
	})
}

func getUser(c *gin.Context) {
	id := c.Param("id")
	for _, user := range users {
		if user.ID == id {
			c.JSON(http.StatusOK, gin.H{
				"data":    user,
				"message": "User retrieved successfully",
			})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{
		"error": "User not found",
	})
}

func createUser(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	user.ID = strconv.Itoa(len(users) + 1)
	user.CreatedAt = "2024-01-01T00:00:00Z"
	user.UpdatedAt = "2024-01-01T00:00:00Z"
	users = append(users, user)

	c.JSON(http.StatusCreated, gin.H{
		"data":    user,
		"message": "User created successfully",
	})
}

func updateUser(c *gin.Context) {
	id := c.Param("id")
	var updatedUser User
	if err := c.ShouldBindJSON(&updatedUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	for i, user := range users {
		if user.ID == id {
			updatedUser.ID = id
			updatedUser.CreatedAt = user.CreatedAt
			updatedUser.UpdatedAt = "2024-01-01T00:00:00Z"
			users[i] = updatedUser
			c.JSON(http.StatusOK, gin.H{
				"data":    updatedUser,
				"message": "User updated successfully",
			})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{
		"error": "User not found",
	})
}

func deleteUser(c *gin.Context) {
	id := c.Param("id")
	for i, user := range users {
		if user.ID == id {
			users = append(users[:i], users[i+1:]...)
			c.JSON(http.StatusOK, gin.H{
				"message": "User deleted successfully",
			})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{
		"error": "User not found",
	})
}

// Admin handlers
func getAdminStats(c *gin.Context) {
	stats := gin.H{
		"total_courses":     len(courses),
		"total_lessons":     getTotalLessons(),
		"total_users":       len(users),
		"total_comments":    len(comments),
		"completion_rate":   78.5,
		"active_users":      1234,
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    stats,
		"message": "Admin stats retrieved successfully",
	})
}

func getAdminCourses(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"data":    courses,
		"message": "Admin courses retrieved successfully",
	})
}

func getAdminUsers(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"data":    users,
		"message": "Admin users retrieved successfully",
	})
}

// Helper functions
func getTotalLessons() int {
	total := 0
	for _, course := range courses {
		total += len(course.Lessons)
	}
	return total
}

func initMockData() {
	// Initialize mock courses
	courses = []Course{
		{
			ID:          "1",
			Title:       "Go Fundamentals",
			Description: "Master the fundamentals of Go programming language with hands-on examples and real-world projects.",
			Icon:        "Code",
			Difficulty:  "Beginner",
			CreatedAt:   "2024-01-01T00:00:00Z",
			UpdatedAt:   "2024-01-01T00:00:00Z",
			Lessons: []Lesson{
				{
					ID:        "1-1",
					CourseID:  "1",
					Title:     "Introduction to Go",
					Content:   "Welcome to Go programming...",
					Order:     1,
					CreatedAt: "2024-01-01T00:00:00Z",
					UpdatedAt: "2024-01-01T00:00:00Z",
					CodeBlocks: []CodeBlock{
						{
							ID:       "1-1-1",
							Language: "go",
							Code:     `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}`,
							Order:    1,
						},
					},
				},
			},
		},
		{
			ID:          "2",
			Title:       "Advanced Go Patterns",
			Description: "Deep dive into advanced Go concepts including interfaces, goroutines, channels, and design patterns.",
			Icon:        "Zap",
			Difficulty:  "Advanced",
			CreatedAt:   "2024-01-01T00:00:00Z",
			UpdatedAt:   "2024-01-01T00:00:00Z",
			Lessons: []Lesson{
				{
					ID:        "2-1",
					CourseID:  "2",
					Title:     "Interfaces and Polymorphism",
					Content:   "Interfaces in Go are one of the most powerful features...",
					Order:     1,
					CreatedAt: "2024-01-01T00:00:00Z",
					UpdatedAt: "2024-01-01T00:00:00Z",
					CodeBlocks: []CodeBlock{
						{
							ID:       "2-1-1",
							Language: "go",
							Code:     `type Writer interface {\n    Write([]byte) (int, error)\n}`,
							Order:    1,
						},
					},
				},
			},
		},
	}

	// Initialize mock users
	users = []User{
		{
			ID:        "1",
			Name:      "John Doe",
			Email:     "john@example.com",
			Role:      "admin",
			CreatedAt: "2024-01-01T00:00:00Z",
			UpdatedAt: "2024-01-01T00:00:00Z",
		},
		{
			ID:        "2",
			Name:      "Jane Smith",
			Email:     "jane@example.com",
			Role:      "user",
			CreatedAt: "2024-01-01T00:00:00Z",
			UpdatedAt: "2024-01-01T00:00:00Z",
		},
	}

	// Initialize mock comments
	comments = []Comment{
		{
			ID:        "1",
			LessonID:  "1-1",
			UserID:    "2",
			Content:   "Great introduction to Go! Very clear explanations.",
			Author:    "Jane Smith",
			CreatedAt: "2024-01-01T00:00:00Z",
			UpdatedAt: "2024-01-01T00:00:00Z",
		},
	}
}
