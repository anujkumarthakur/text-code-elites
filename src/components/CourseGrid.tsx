import { Code, Zap, Server, Rocket, Layers, BookOpen, Star, Users, Clock, ArrowRight, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Course } from '@/pages/Index';
import { useState } from 'react';

interface CourseGridProps {
  onCourseSelect: (course: Course) => void;
}

// Mock data - this will come from backend API
const courses: Course[] = [
  {
    id: '1',
    title: 'Go Fundamentals',
    description: 'Master the fundamentals of Go programming language with hands-on examples and real-world projects.',
    icon: 'Code',
    difficulty: 'Beginner',
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
- **Cross-platform**: Runs on multiple operating systems

## Your First Go Program

Let's start with the classic "Hello, World!" program:

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

This simple program demonstrates several key concepts:
- Every Go program starts with a package declaration
- The \`main\` package is special - it's the entry point
- We import the \`fmt\` package for formatted I/O
- The \`main()\` function is where execution begins

## Key Go Features

### 1. Static Typing
Go is statically typed, meaning variable types are known at compile time:

\`\`\`go
var name string = "Alice"
var age int = 30
var isActive bool = true
\`\`\`

### 2. Type Inference
Go can infer types automatically:

\`\`\`go
name := "Alice"        // string
age := 30              // int
isActive := true       // bool
\`\`\`

### 3. Functions
Functions are first-class citizens in Go:

\`\`\`go
func greet(name string) string {
    return "Hello, " + name
}

func add(a, b int) int {
    return a + b
}
\`\`\`

Let's dive deeper into Go's powerful features in the next lessons!`
      },
      {
        id: '1-2',
        title: 'Variables and Data Types',
        content: `# Variables and Data Types in Go

Understanding Go's type system is fundamental to writing effective Go programs.

## Variable Declaration

Go provides multiple ways to declare variables:

### Explicit Declaration
\`\`\`go
var name string
var age int
var isActive bool
\`\`\`

### Declaration with Initialization
\`\`\`go
var name string = "John"
var age int = 25
var isActive bool = true
\`\`\`

### Short Declaration (Inside Functions)
\`\`\`go
name := "John"
age := 25
isActive := true
\`\`\`

## Basic Data Types

### Numeric Types
\`\`\`go
// Integers
var a int = 42
var b int8 = 127
var c int16 = 32767
var d int32 = 2147483647
var e int64 = 9223372036854775807

// Unsigned integers
var f uint = 42
var g uint8 = 255
var h uint16 = 65535

// Floating point
var pi float32 = 3.14159
var e float64 = 2.718281828
\`\`\`

### String and Boolean
\`\`\`go
var message string = "Hello, Go!"
var isValid bool = true
\`\`\`

### Constants
\`\`\`go
const Pi = 3.14159
const MaxUsers = 100
const AppName = "MyGoApp"
\`\`\`

## Zero Values

In Go, variables have zero values when not explicitly initialized:
- \`0\` for numeric types
- \`false\` for boolean
- \`""\` (empty string) for strings
- \`nil\` for pointers, functions, interfaces, slices, channels, and maps

\`\`\`go
var count int        // 0
var active bool      // false
var name string      // ""
\`\`\`

This ensures your variables always have predictable initial values!`
      },
      {
        id: '1-3',
        title: 'Control Structures',
        content: `# Control Structures in Go

Go provides several control structures for managing program flow.

## If Statements

\`\`\`go
age := 18

if age >= 18 {
    fmt.Println("You are an adult")
} else if age >= 13 {
    fmt.Println("You are a teenager")
} else {
    fmt.Println("You are a child")
}
\`\`\`

### If with Short Statement
\`\`\`go
if num := getRandomNumber(); num > 50 {
    fmt.Printf("Number %d is greater than 50\n", num)
}
\`\`\`

## For Loops

Go has only one looping construct: the \`for\` loop.

### Traditional For Loop
\`\`\`go
for i := 0; i < 10; i++ {
    fmt.Println(i)
}
\`\`\`

### While-style Loop
\`\`\`go
i := 0
for i < 10 {
    fmt.Println(i)
    i++
}
\`\`\`

### Infinite Loop
\`\`\`go
for {
    // This runs forever
    // Use break to exit
}
\`\`\`

### Range Loop
\`\`\`go
numbers := []int{1, 2, 3, 4, 5}

for index, value := range numbers {
    fmt.Printf("Index: %d, Value: %d\n", index, value)
}

// If you only need the value
for _, value := range numbers {
    fmt.Println(value)
}
\`\`\`

## Switch Statements

\`\`\`go
day := "Monday"

switch day {
case "Monday":
    fmt.Println("Start of work week")
case "Friday":
    fmt.Println("TGIF!")
case "Saturday", "Sunday":
    fmt.Println("Weekend!")
default:
    fmt.Println("Regular day")
}
\`\`\`

### Switch without Expression
\`\`\`go
score := 85

switch {
case score >= 90:
    fmt.Println("A grade")
case score >= 80:
    fmt.Println("B grade")
case score >= 70:
    fmt.Println("C grade")
default:
    fmt.Println("Need improvement")
}
\`\`\`

These control structures form the foundation of program logic in Go!`
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced Go Patterns',
    description: 'Deep dive into advanced Go concepts including interfaces, goroutines, channels, and design patterns.',
    icon: 'Zap',
    difficulty: 'Advanced',
    lessons: [
      {
        id: '2-1',
        title: 'Interfaces and Polymorphism',
        content: `# Interfaces and Polymorphism in Go

Interfaces in Go are one of the most powerful features that enable clean, flexible, and testable code.

## What are Interfaces?

An interface in Go is a type that specifies a method set. Any type that implements all the methods of an interface automatically satisfies that interface.

\`\`\`go
type Writer interface {
    Write([]byte) (int, error)
}

type Reader interface {
    Read([]byte) (int, error)
}
\`\`\`

## Implementing Interfaces

Unlike other languages, Go uses implicit interface satisfaction:

\`\`\`go
type File struct {
    name string
}

func (f *File) Write(data []byte) (int, error) {
    // Write implementation
    return len(data), nil
}

// File automatically implements Writer interface
var w Writer = &File{name: "example.txt"}
\`\`\`

## Interface Composition

\`\`\`go
type ReadWriter interface {
    Reader
    Writer
}

type ReadWriteCloser interface {
    ReadWriter
    Close() error
}
\`\`\`

## Empty Interface

The empty interface \`interface{}\` can hold values of any type:

\`\`\`go
func PrintAny(v interface{}) {
    fmt.Println(v)
}

PrintAny(42)
PrintAny("hello")
PrintAny([]int{1, 2, 3})
\`\`\`

## Type Assertions and Type Switches

\`\`\`go
func ProcessValue(v interface{}) {
    switch val := v.(type) {
    case string:
        fmt.Printf("String: %s\n", val)
    case int:
        fmt.Printf("Integer: %d\n", val)
    case bool:
        fmt.Printf("Boolean: %t\n", val)
    default:
        fmt.Printf("Unknown type: %T\n", val)
    }
}
\`\`\`

Interfaces make Go code more modular and testable!`
      }
    ]
  },
  {
    id: '3',
    title: 'Rust Fundamentals',
    description: 'Learn Rust from scratch with focus on memory safety, ownership, and systems programming.',
    icon: 'Server',
    difficulty: 'Beginner',
    lessons: [
      {
        id: '3-1',
        title: 'Getting Started with Rust',
        content: `# Welcome to Rust Programming

Rust is a systems programming language that focuses on safety, speed, and concurrency.

## Why Rust?

- **Memory safety**: No null pointer dereferences, buffer overflows, or memory leaks
- **Zero-cost abstractions**: High-level features with no runtime overhead
- **Fearless concurrency**: Safe concurrent programming
- **Cross-platform**: Runs everywhere from embedded devices to web servers

## Your First Rust Program

\`\`\`rust
fn main() {
    println!("Hello, world!");
}
\`\`\`

## Key Rust Concepts

### Ownership
Rust's ownership system ensures memory safety without garbage collection:

\`\`\`rust
fn main() {
    let s = String::from("hello");
    takes_ownership(s); // s is moved here
    // s can no longer be used
    
    let x = 5;
    makes_copy(x); // x is copied, still usable
    println!("x: {}", x);
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
} // some_string goes out of scope and is dropped

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
}
\`\`\`

### Borrowing
References allow you to use a value without taking ownership:

\`\`\`rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
\`\`\`

Let's explore more Rust features in upcoming lessons!`
      }
    ]
  },
  {
    id: '4',
    title: 'Advanced Rust',
    description: 'Master advanced Rust concepts including lifetimes, traits, macros, and unsafe code.',
    icon: 'Rocket',
    difficulty: 'Advanced',
    lessons: [
      {
        id: '4-1',
        title: 'Lifetimes and Advanced Borrowing',
        content: `# Lifetimes and Advanced Borrowing

Lifetimes ensure that references are valid for as long as we need them.

## Understanding Lifetimes

\`\`\`rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
\`\`\`

## Lifetime Annotations in Structs

\`\`\`rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}

impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }
    
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {}", announcement);
        self.part
    }
}
\`\`\`

## The Static Lifetime

\`\`\`rust
let s: &'static str = "I have a static lifetime.";
\`\`\`

Advanced lifetime management is key to writing safe, efficient Rust code!`
      }
    ]
  },
  {
    id: '5',
    title: 'Microservices & REST APIs',
    description: 'Build scalable microservices and REST APIs using Go and modern architectural patterns.',
    icon: 'Layers',
    difficulty: 'Advanced',
    lessons: [
      {
        id: '5-1',
        title: 'REST API Design Principles',
        content: `# REST API Design Principles

Learn how to design clean, maintainable REST APIs that scale.

## REST Fundamentals

REST (Representational State Transfer) defines a set of constraints for web services:

### HTTP Methods
- **GET**: Retrieve data
- **POST**: Create new resources
- **PUT**: Update/replace resources
- **PATCH**: Partial updates
- **DELETE**: Remove resources

### Status Codes
\`\`\`
200 OK - Success
201 Created - Resource created
400 Bad Request - Client error
401 Unauthorized - Authentication required
404 Not Found - Resource doesn't exist
500 Internal Server Error - Server error
\`\`\`

## API Design Best Practices

### 1. Use Nouns for Resources
\`\`\`
GET /users          # Get all users
GET /users/123      # Get user with ID 123
POST /users         # Create new user
PUT /users/123      # Update user 123
DELETE /users/123   # Delete user 123
\`\`\`

### 2. Consistent Response Format
\`\`\`json
{
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "meta": {
    "timestamp": "2023-01-01T12:00:00Z"
  }
}
\`\`\`

### 3. Error Handling
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": {
      "field": "email",
      "value": ""
    }
  }
}
\`\`\`

## Go Example with Gin

\`\`\`go
package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

func main() {
    r := gin.Default()
    
    r.GET("/users", getUsers)
    r.GET("/users/:id", getUser)
    r.POST("/users", createUser)
    
    r.Run(":8080")
}

func getUsers(c *gin.Context) {
    users := []User{
        {ID: 1, Name: "John", Email: "john@example.com"},
        {ID: 2, Name: "Jane", Email: "jane@example.com"},
    }
    c.JSON(http.StatusOK, gin.H{"data": users})
}
\`\`\`

This foundation will help you build robust, scalable APIs!`
      }
    ]
  }
];

const courseCategories = [
  { id: 'golang', name: 'Golang Fundamentals', courseIds: ['1'] },
  { id: 'advanced-golang', name: 'Advanced Golang', courseIds: ['2'] },
  { id: 'rust', name: 'Rust Fundamentals', courseIds: ['3'] },
  { id: 'advanced-rust', name: 'Advanced Rust', courseIds: ['4'] },
  { id: 'microservices', name: 'Microservices & APIs', courseIds: ['5'] }
];

const iconMap = {
  Code, 
  Zap, 
  Server,
  Rocket,
  Layers,
  BookOpen
};

export function CourseGrid({ onCourseSelect }: CourseGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('golang');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentCategory = courseCategories.find(cat => cat.id === selectedCategory);
  const currentCourses = courses.filter(course => 
    currentCategory?.courseIds.includes(course.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-slate-900/50 dark:to-slate-800/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Master <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Modern</span> Programming
            </h1>
            <p className="text-lg lg:text-xl text-blue-100 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Start your journey with comprehensive, text-based courses designed by industry experts. 
              Build production-ready skills with hands-on projects and real-world examples.
            </p>
            
            {/* Course Category Selector */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <Button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 px-6 py-3 text-lg font-medium flex items-center space-x-2 min-w-[250px] justify-between"
                >
                  <span>{currentCategory?.name}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 z-10">
                    {courseCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${
                          selectedCategory === category.id 
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                            : 'text-gray-700 dark:text-gray-300'
                        } ${category === courseCategories[0] ? 'rounded-t-lg' : ''} ${
                          category === courseCategories[courseCategories.length - 1] ? 'rounded-b-lg' : ''
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 animate-fade-in">
              <div className="flex items-center text-blue-100 dark:text-slate-300">
                <Users className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="font-medium">50,000+ Students</span>
              </div>
              <div className="flex items-center text-blue-100 dark:text-slate-300">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center text-blue-100 dark:text-slate-300">
                <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="font-medium">Self-Paced</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-16 left-1/4 w-12 h-12 bg-blue-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Course Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
            {currentCategory?.name} Course
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-slide-up">
            Comprehensive curriculum designed to take you from beginner to expert
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentCourses.map((course, index) => {
            const IconComponent = iconMap[course.icon as keyof typeof iconMap];
            return (
              <Card 
                key={course.id} 
                className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onCourseSelect(course)}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 group-hover:from-purple-500 group-hover:to-indigo-600 transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <Badge 
                      variant={course.difficulty === 'Beginner' ? 'default' : 'destructive'}
                      className="px-3 py-1 font-medium text-sm"
                    >
                      {course.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-3">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-8 line-clamp-3">
                    {course.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <span className="flex items-center bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {course.lessons.length} Lessons
                    </span>
                    <span className="flex items-center bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4 mr-2" />
                      Self-paced
                    </span>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-xl shadow-lg"
                  >
                    Start Learning
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Start Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/50 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Hands-on Coding</h3>
            <p className="text-gray-600 dark:text-gray-300">Learn by doing with practical examples and real-world projects that build your portfolio.</p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-800/50 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Expert Community</h3>
            <p className="text-gray-600 dark:text-gray-300">Connect with fellow learners and industry experts in our vibrant learning community.</p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200/50 dark:border-yellow-800/50 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Industry Recognition</h3>
            <p className="text-gray-600 dark:text-gray-300">Get certificates and build skills that are recognized by top tech companies worldwide.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
