package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Models
type Course struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Icon        string   `json:"icon"`
	Difficulty  string   `json:"difficulty"`
	Lessons     []Lesson `json:"lessons"`
	CreatedAt   string   `json:"createdAt"`
	UpdatedAt   string   `json:"updatedAt"`
}

type Lesson struct {
	ID         string      `json:"id"`
	CourseID   string      `json:"course_id"`
	Title      string      `json:"title"`
	Content    string      `json:"content"`
	CodeBlocks []CodeBlock `json:"codeBlocks"` // Corrected tag
	Order      int         `json:"order"`
	Completed  bool        `json:"completed,omitempty"`
	CreatedAt  string      `json:"createdAt"`
	UpdatedAt  string      `json:"updatedAt"`
}

type CodeBlock struct {
	ID       string `json:"id"`
	Type     string `json:"type"`
	Content  string `json:"content"`
	Language string `json:"language,omitempty"`
}

const dataPath = "data"

// Helper to get all courses from files
func getAllCourses() ([]Course, error) {
	var courses []Course
	files, err := ioutil.ReadDir(dataPath)
	if err != nil {
		return nil, err
	}

	for _, file := range files {
		if filepath.Ext(file.Name()) == ".json" {
			data, err := ioutil.ReadFile(filepath.Join(dataPath, file.Name()))
			if err != nil {
				log.Printf("Error reading file %s: %v", file.Name(), err)
				continue
			}

			var course Course
			if err := json.Unmarshal(data, &course); err == nil {
				// Ensure lessons and codeblocks are not nil
				if course.Lessons == nil {
					course.Lessons = []Lesson{}
				}
				for i := range course.Lessons {
					if course.Lessons[i].CodeBlocks == nil {
						course.Lessons[i].CodeBlocks = []CodeBlock{}
					}
				}
				courses = append(courses, course)
			} else {
				log.Printf("Error unmarshalling file %s: %v", file.Name(), err)
			}
		}
	}
	return courses, nil
}

// Helper to find a course file path by its ID
func findCourseFilePath(courseID string) (string, error) {
	courses, err := getAllCourses()
	if err != nil {
		return "", err
	}
	for _, course := range courses {
		if course.ID == courseID {
			fileName := strings.ReplaceAll(strings.ToLower(course.Title), " ", "-") + ".json"
			return filepath.Join(dataPath, fileName), nil
		}
	}
	return "", os.ErrNotExist
}

func main() {
	if _, err := os.Stat(dataPath); os.IsNotExist(err) {
		os.Mkdir(dataPath, os.ModePerm)
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:8081"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	api := r.Group("/api/v1")
	{
		courses := api.Group("/courses")
		{
			courses.GET("", getCourses)
			courses.POST("", createCourse)
			courses.GET("/:id", getCourse)
			courses.PUT("/:id", updateCourse)
			courses.DELETE("/:id", deleteCourse)

			// Nested lesson routes
			courses.GET("/:id/lessons", getLessons)
			courses.POST("/:id/lessons", createLesson)
			courses.PUT("/:id/lessons/:lesson_id", updateLesson)
			courses.DELETE("/:id/lessons/:lesson_id", deleteLesson)
		}
	}

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "healthy"})
	})

	log.Println("🚀 Server starting on http://localhost:8080")
	log.Fatal(r.Run(":8082"))
}

// Course Handlers
func getCourses(c *gin.Context) {
	courses, err := getAllCourses()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read data directory"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": courses})
}

func getCourse(c *gin.Context) {
	filePath, err := findCourseFilePath(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course file not found"})
		return
	}
	var course Course
	json.Unmarshal(data, &course)
	// Ensure lessons and codeblocks are not nil
	if course.Lessons == nil {
		course.Lessons = []Lesson{}
	}
	for i := range course.Lessons {
		if course.Lessons[i].CodeBlocks == nil {
			course.Lessons[i].CodeBlocks = []CodeBlock{}
		}
	}
	c.JSON(http.StatusOK, gin.H{"data": course})
}

func createCourse(c *gin.Context) {
	var course Course
	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	course.ID = strconv.FormatInt(time.Now().Unix(), 10)
	now := time.Now().Format(time.RFC3339)
	course.CreatedAt = now
	course.UpdatedAt = now
	if course.Lessons == nil {
		course.Lessons = []Lesson{}
	}

	fileName := strings.ReplaceAll(strings.ToLower(course.Title), " ", "-") + ".json"
	filePath := filepath.Join(dataPath, fileName)

	data, _ := json.MarshalIndent(course, "", "  ")
	if err := ioutil.WriteFile(filePath, data, 0644); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to write course data"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": course})
}

func updateCourse(c *gin.Context) {
	courseID := c.Param("id")
	filePath, err := findCourseFilePath(courseID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}

	var updatedCourse Course
	if err := c.ShouldBindJSON(&updatedCourse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data, _ := ioutil.ReadFile(filePath)
	var existingCourse Course
	json.Unmarshal(data, &existingCourse)

	// Preserve original creation date and lessons
	updatedCourse.ID = courseID
	updatedCourse.CreatedAt = existingCourse.CreatedAt
	// Ensure lessons are not overwritten if not provided in update, or initialize if nil
	if updatedCourse.Lessons == nil {
		updatedCourse.Lessons = existingCourse.Lessons
	}
	updatedCourse.UpdatedAt = time.Now().Format(time.RFC3339)

	// Handle potential file rename if title changes
	newFileName := strings.ReplaceAll(strings.ToLower(updatedCourse.Title), " ", "-") + ".json"
	newFilePath := filepath.Join(dataPath, newFileName)

	if filePath != newFilePath {
		os.Remove(filePath)
	}

	newData, _ := json.MarshalIndent(updatedCourse, "", "  ")
	ioutil.WriteFile(newFilePath, newData, 0644)

	c.JSON(http.StatusOK, gin.H{"data": updatedCourse})
}

func deleteCourse(c *gin.Context) {
	filePath, err := findCourseFilePath(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}
	if err := os.Remove(filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete course file"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Course deleted successfully"})
}

// Lesson Handlers
func getLessons(c *gin.Context) {
	filePath, err := findCourseFilePath(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}
	data, _ := ioutil.ReadFile(filePath)
	var course Course
	json.Unmarshal(data, &course)
	// Ensure Lessons is never nil
	if course.Lessons == nil {
		course.Lessons = []Lesson{}
	}
	for i := range course.Lessons {
		if course.Lessons[i].CodeBlocks == nil {
			course.Lessons[i].CodeBlocks = []CodeBlock{}
		}
	}
	c.JSON(http.StatusOK, gin.H{"data": course.Lessons})
}

func createLesson(c *gin.Context) {
	courseID := c.Param("id")
	filePath, err := findCourseFilePath(courseID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}

	var lesson Lesson
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read request body"})
		return
	}
	log.Printf("Raw lesson creation request body: %s", string(body))

	if err := json.Unmarshal(body, &lesson); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format for lesson"})
		return
	}
	log.Printf("Received lesson for creation: %+v", lesson)

	data, _ := ioutil.ReadFile(filePath)
	var course Course
	json.Unmarshal(data, &course)

	now := time.Now()
	lesson.ID = strconv.FormatInt(now.UnixNano(), 10)
	lesson.CourseID = courseID
	lesson.CreatedAt = now.Format(time.RFC3339)
	lesson.UpdatedAt = now.Format(time.RFC3339)
	// Ensure CodeBlocks is never nil
	if lesson.CodeBlocks == nil {
		lesson.CodeBlocks = []CodeBlock{}
	}

	course.Lessons = append(course.Lessons, lesson)
	course.UpdatedAt = now.Format(time.RFC3339)

	newData, _ := json.MarshalIndent(course, "", "  ")
	ioutil.WriteFile(filePath, newData, 0644)

	c.JSON(http.StatusCreated, gin.H{"data": lesson})
}

func updateLesson(c *gin.Context) {
	courseID := c.Param("id")
	lessonID := c.Param("lesson_id")
	filePath, err := findCourseFilePath(courseID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}

	var updatedLesson Lesson
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read request body"})
		return
	}
	log.Printf("Raw lesson update request body: %s", string(body))

	if err := json.Unmarshal(body, &updatedLesson); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format for lesson update"})
		return
	}
	log.Printf("Received lesson for update: %+v", updatedLesson)

	data, _ := ioutil.ReadFile(filePath)
	var course Course
	json.Unmarshal(data, &course)

	lessonIndex := -1
	for i, l := range course.Lessons {
		if l.ID == lessonID {
			lessonIndex = i
			break
		}
	}

	if lessonIndex == -1 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Lesson not found"})
		return
	}

	// Preserve original creation date
	updatedLesson.CreatedAt = course.Lessons[lessonIndex].CreatedAt
	updatedLesson.ID = lessonID
	updatedLesson.CourseID = courseID
	updatedLesson.UpdatedAt = time.Now().Format(time.RFC3339)
	// Ensure CodeBlocks is never nil
	if updatedLesson.CodeBlocks == nil {
		updatedLesson.CodeBlocks = []CodeBlock{}
	}

	course.Lessons[lessonIndex] = updatedLesson
	course.UpdatedAt = time.Now().Format(time.RFC3339)

	newData, _ := json.MarshalIndent(course, "", "  ")
	ioutil.WriteFile(filePath, newData, 0644)

	c.JSON(http.StatusOK, gin.H{"data": updatedLesson})
}

func deleteLesson(c *gin.Context) {
	courseID := c.Param("id")
	lessonID := c.Param("lesson_id")
	filePath, err := findCourseFilePath(courseID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}

	data, _ := ioutil.ReadFile(filePath)
	var course Course
	json.Unmarshal(data, &course)

	lessonIndex := -1
	for i, l := range course.Lessons {
		if l.ID == lessonID {
			lessonIndex = i
			break
		}
	}

	if lessonIndex == -1 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Lesson not found"})
		return
	}

	course.Lessons = append(course.Lessons[:lessonIndex], course.Lessons[lessonIndex+1:]...)
	course.UpdatedAt = time.Now().Format(time.RFC3339)

	newData, _ := json.MarshalIndent(course, "", "  ")
	ioutil.WriteFile(filePath, newData, 0644)

	c.JSON(http.StatusOK, gin.H{"message": "Lesson deleted successfully"})
}
