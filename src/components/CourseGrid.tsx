import { Code, Zap, Server, Rocket, Layers, BookOpen, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/pages/Index';

interface CourseGridProps {
  onCourseSelect: (course: Course) => void;
}

const courses: Course[] = [
  {
    id: 'golang-basics',
    title: 'Golang Fundamentals',
    description: 'Master the basics of Go programming language with hands-on examples and practical projects.',
    icon: 'Code',
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'intro',
        title: 'Introduction to Go',
        content: `# Welcome to Go Programming

Go, also known as Golang, is a programming language developed at Google. It's designed to be simple, efficient, and reliable.

## Why Learn Go?

Go has become increasingly popular for several reasons:

- **Simplicity**: Clean syntax that's easy to read and write
- **Performance**: Compiled language with excellent runtime performance  
- **Concurrency**: Built-in support for concurrent programming
- **Standard Library**: Rich standard library for common tasks
- **Cross-platform**: Compile to multiple platforms easily

## Your First Go Program

Let's start with the traditional "Hello, World!" program:

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

This simple program demonstrates several key concepts:
- Every Go program starts with a package declaration
- The \`main\` package is special - it defines an executable program
- We import the \`fmt\` package for formatted I/O
- The \`main\` function is the entry point of the program

## Setting Up Your Environment

Before we dive deeper, make sure you have Go installed on your system. You can download it from [golang.org](https://golang.org/dl/).

To verify your installation, run:

\`\`\`bash
go version
\`\`\`

You should see output similar to:
\`\`\`
go version go1.21.0 linux/amd64
\`\`\`

Now you're ready to start your Go journey!`
      },
      {
        id: 'variables',
        title: 'Variables and Types',
        content: `# Variables and Data Types in Go

Understanding variables and data types is fundamental to any programming language. Go provides a clean and straightforward approach to variable declaration and type system.

## Variable Declaration

Go offers several ways to declare variables:

### Explicit Declaration
\`\`\`go
var name string = "John"
var age int = 30
var isActive bool = true
\`\`\`

### Type Inference
\`\`\`go
var name = "John"     // Go infers string type
var age = 30          // Go infers int type
var isActive = true   // Go infers bool type
\`\`\`

### Short Declaration (inside functions only)
\`\`\`go
name := "John"
age := 30
isActive := true
\`\`\`

## Basic Data Types

Go has several built-in data types:

### Numeric Types
\`\`\`go
// Integers
var smallNumber int8 = 127
var normalNumber int = 42
var bigNumber int64 = 9223372036854775807

// Unsigned integers
var positiveNumber uint = 42
var byteValue byte = 255 // byte is alias for uint8

// Floating point
var pi float32 = 3.14159
var precise float64 = 3.141592653589793
\`\`\`

### String and Boolean
\`\`\`go
var message string = "Hello, Go!"
var isReady bool = false
\`\`\`

### Complex Numbers
\`\`\`go
var complexNum complex64 = 1 + 2i
var preciseComplex complex128 = 1.5 + 2.5i
\`\`\`

## Zero Values

In Go, variables declared without an explicit initial value are given their zero value:

\`\`\`go
var i int       // 0
var f float64   // 0.0
var b bool      // false
var s string    // ""
\`\`\`

## Constants

Constants are declared using the \`const\` keyword:

\`\`\`go
const Pi = 3.14159
const Language = "Go"
const Year = 2023

// Multiple constants
const (
    StatusOK = 200
    StatusNotFound = 404
    StatusInternalServerError = 500
)
\`\`\`

## Type Conversion

Go requires explicit type conversion:

\`\`\`go
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)
\`\`\`

This explicit conversion helps prevent bugs and makes code more readable.`
      }
    ]
  },
  {
    id: 'golang-advanced',
    title: 'Advanced Go',
    description: 'Deep dive into advanced Go concepts including concurrency, interfaces, and performance optimization.',
    icon: 'Zap',
    difficulty: 'Advanced',
    lessons: [
      {
        id: 'goroutines',
        title: 'Goroutines and Channels',
        content: `# Goroutines and Channels

One of Go's most powerful features is its built-in concurrency support through goroutines and channels.

## Goroutines

A goroutine is a lightweight thread managed by the Go runtime. Goroutines are much more efficient than traditional threads.

### Creating Goroutines

\`\`\`go
package main

import (
    "fmt"
    "time"
)

func sayHello(name string) {
    for i := 0; i < 3; i++ {
        fmt.Printf("Hello, %s! (%d)\\n", name, i)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    // Start goroutines
    go sayHello("Alice")
    go sayHello("Bob")
    
    // Wait for goroutines to complete
    time.Sleep(1 * time.Second)
    fmt.Println("Main function ending")
}
\`\`\`

## Channels

Channels are the pipes that connect concurrent goroutines. They allow you to pass values between goroutines.

### Basic Channel Operations

\`\`\`go
package main

import "fmt"

func main() {
    // Create a channel
    messages := make(chan string)
    
    // Send a value into the channel (in a goroutine)
    go func() {
        messages <- "Hello, Channel!"
    }()
    
    // Receive a value from the channel
    msg := <-messages
    fmt.Println(msg)
}
\`\`\`

### Buffered Channels

\`\`\`go
package main

import "fmt"

func main() {
    // Create a buffered channel with capacity of 2
    messages := make(chan string, 2)
    
    // Send values (won't block because of buffer)
    messages <- "Message 1"
    messages <- "Message 2"
    
    // Receive values
    fmt.Println(<-messages)
    fmt.Println(<-messages)
}
\`\`\`

### Channel Directions

You can restrict channels to only send or only receive:

\`\`\`go
// Send-only channel
func sender(ch chan<- string) {
    ch <- "Hello"
}

// Receive-only channel  
func receiver(ch <-chan string) {
    msg := <-ch
    fmt.Println(msg)
}
\`\`\`

## Select Statement

The \`select\` statement lets a goroutine wait on multiple communication operations:

\`\`\`go
package main

import (
    "fmt"
    "time"
)

func main() {
    c1 := make(chan string)
    c2 := make(chan string)
    
    go func() {
        time.Sleep(1 * time.Second)
        c1 <- "Channel 1"
    }()
    
    go func() {
        time.Sleep(2 * time.Second) 
        c2 <- "Channel 2"
    }()
    
    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-c1:
            fmt.Println("Received:", msg1)
        case msg2 := <-c2:
            fmt.Println("Received:", msg2)
        }
    }
}
\`\`\`

This powerful combination of goroutines and channels makes concurrent programming in Go both elegant and efficient.`
      }
    ]
  },
  {
    id: 'rust-basics',
    title: 'Rust Fundamentals', 
    description: 'Learn Rust from the ground up with emphasis on memory safety and performance.',
    icon: 'Rocket',
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'intro-rust',
        title: 'Introduction to Rust',
        content: `# Welcome to Rust Programming

Rust is a systems programming language that focuses on safety, speed, and concurrency. It achieves memory safety without garbage collection, making it ideal for performance-critical applications.

## Why Rust?

Rust offers unique advantages:

- **Memory Safety**: Prevents common bugs like null pointer dereferences and buffer overflows
- **Zero-Cost Abstractions**: High-level features with no runtime overhead
- **Concurrency**: Built-in support for safe concurrent programming
- **Performance**: Comparable to C and C++ in speed
- **Rich Type System**: Expressive types that catch errors at compile time

## Your First Rust Program

Let's start with a simple "Hello, World!" program:

\`\`\`rust
fn main() {
    println!("Hello, World!");
}
\`\`\`

Key observations:
- \`fn\` declares a function
- \`main\` is the entry point of the program
- \`println!\` is a macro (note the \`!\`) for printing text
- Rust uses snake_case for function and variable names

## Setting Up Rust

Install Rust using rustup (the recommended way):

\`\`\`bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
\`\`\`

Verify your installation:

\`\`\`bash
rustc --version
cargo --version
\`\`\`

## Creating a New Project

Cargo is Rust's build system and package manager:

\`\`\`bash
cargo new hello_rust
cd hello_rust
cargo run
\`\`\`

This creates a new Rust project with the following structure:
\`\`\`
hello_rust/
├── Cargo.toml
└── src/
    └── main.rs
\`\`\`

## Basic Syntax

Here's a more complex example showing Rust's syntax:

\`\`\`rust
fn main() {
    let greeting = "Hello";
    let name = "Rustacean";
    
    println!("{}, {}!", greeting, name);
    
    // Variables are immutable by default
    let x = 5;
    // x = 6; // This would cause a compile error!
    
    // Use 'mut' for mutable variables
    let mut y = 5;
    y = 6; // This is fine
    
    println!("x = {}, y = {}", x, y);
}
\`\`\`

Rust's ownership system ensures memory safety at compile time, which we'll explore in the next lessons!`
      }
    ]
  },
  {
    id: 'rust-advanced',
    title: 'Advanced Rust',
    description: 'Master advanced Rust concepts including ownership, lifetimes, and async programming.',
    icon: 'Layers',
    difficulty: 'Advanced', 
    lessons: [
      {
        id: 'ownership',
        title: 'Ownership and Borrowing',
        content: `# Ownership and Borrowing in Rust

Ownership is Rust's most unique feature. It enables memory safety without garbage collection by enforcing strict rules at compile time.

## The Ownership Rules

1. Each value in Rust has a variable that's called its owner
2. There can only be one owner at a time
3. When the owner goes out of scope, the value will be dropped

## Ownership in Action

\`\`\`rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 is moved to s2
    
    // println!("{}", s1); // This would cause a compile error!
    println!("{}", s2); // This works
}
\`\`\`

When we assign \`s1\` to \`s2\`, the ownership moves. \`s1\` is no longer valid.

## Cloning

If you want to deeply copy data:

\`\`\`rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone(); // Deep copy
    
    println!("s1 = {}, s2 = {}", s1, s2); // Both are valid
}
\`\`\`

## Functions and Ownership

Passing a value to a function will move or copy it:

\`\`\`rust
fn main() {
    let s = String::from("hello");
    
    takes_ownership(s); // s's value moves into function
    // s is no longer valid here
    
    let x = 5;
    makes_copy(x); // x would move into function
    // but i32 is Copy, so x is still valid
    
    println!("x = {}", x); // This works
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
} // some_string goes out of scope and is dropped

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
} // some_integer goes out of scope but nothing special happens
\`\`\`

## References and Borrowing

Instead of taking ownership, you can borrow values using references:

\`\`\`rust
fn main() {
    let s1 = String::from("hello");
    
    let len = calculate_length(&s1); // Borrow s1
    
    println!("The length of '{}' is {}.", s1, len);
    // s1 is still valid!
}

fn calculate_length(s: &String) -> usize {
    s.len() // Return length without taking ownership
} // s goes out of scope but doesn't drop the value it refers to
\`\`\`

## Mutable References

You can also borrow mutably:

\`\`\`rust
fn main() {
    let mut s = String::from("hello");
    
    change(&mut s);
    
    println!("{}", s); // Prints "hello, world"
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
\`\`\`

## Borrowing Rules

1. At any given time, you can have either:
   - One mutable reference, OR
   - Any number of immutable references
2. References must always be valid

\`\`\`rust
fn main() {
    let mut s = String::from("hello");
    
    let r1 = &s; // No problem
    let r2 = &s; // No problem
    println!("{} and {}", r1, r2);
    // r1 and r2 are no longer used after this point
    
    let r3 = &mut s; // No problem
    println!("{}", r3);
}
\`\`\`

This system prevents data races at compile time and ensures memory safety without runtime overhead!`
      }
    ]
  },
  {
    id: 'microservices',
    title: 'Microservice REST APIs',
    description: 'Build scalable microservices and RESTful APIs using modern patterns and practices.',
    icon: 'Server',
    difficulty: 'Advanced',
    lessons: [
      {
        id: 'rest-principles',
        title: 'REST API Principles',
        content: `# RESTful API Design Principles

REST (Representational State Transfer) is an architectural style for designing networked applications. Understanding its principles is crucial for building maintainable and scalable APIs.

## Core REST Principles

### 1. Client-Server Architecture
The client and server are separate entities that communicate over a network. This separation allows them to evolve independently.

### 2. Statelessness
Each request from client to server must contain all information needed to understand the request. The server cannot store client context between requests.

### 3. Cacheability
Responses must define themselves as cacheable or non-cacheable to improve performance.

### 4. Uniform Interface
REST defines a uniform interface between components, which includes:
- Resource identification in requests
- Resource manipulation through representations
- Self-descriptive messages
- Hypermedia as the engine of application state

## HTTP Methods and Their Usage

### GET - Retrieve Resources
\`\`\`http
GET /api/users          # Get all users
GET /api/users/123      # Get specific user  
GET /api/users/123/posts # Get user's posts
\`\`\`

### POST - Create Resources
\`\`\`http
POST /api/users
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com"
}
\`\`\`

### PUT - Update/Replace Resources
\`\`\`http
PUT /api/users/123
Content-Type: application/json

{
    "name": "John Smith", 
    "email": "john.smith@example.com"
}
\`\`\`

### PATCH - Partial Updates
\`\`\`http
PATCH /api/users/123
Content-Type: application/json

{
    "email": "newemail@example.com"
}
\`\`\`

### DELETE - Remove Resources
\`\`\`http
DELETE /api/users/123
\`\`\`

## Status Codes

Use appropriate HTTP status codes:

### Success Codes (2xx)
- \`200 OK\` - Successful GET, PUT, PATCH
- \`201 Created\` - Successful POST
- \`204 No Content\` - Successful DELETE

### Client Error Codes (4xx)
- \`400 Bad Request\` - Invalid request data
- \`401 Unauthorized\` - Authentication required
- \`403 Forbidden\` - Access denied
- \`404 Not Found\` - Resource doesn't exist
- \`409 Conflict\` - Resource conflict

### Server Error Codes (5xx)
- \`500 Internal Server Error\` - Server-side error
- \`503 Service Unavailable\` - Server temporarily unavailable

## Resource Naming Conventions

### Use Nouns, Not Verbs
\`\`\`
✅ Good:
GET /api/users
POST /api/users
GET /api/users/123

❌ Bad:
GET /api/getUsers
POST /api/createUser
GET /api/getUserById/123
\`\`\`

### Use Plural Nouns
\`\`\`
✅ Good: /api/users
❌ Bad: /api/user
\`\`\`

### Hierarchical Resources
\`\`\`
GET /api/users/123/posts      # User's posts
GET /api/users/123/posts/456  # Specific post by user
\`\`\`

## Example API Response

\`\`\`json
{
    "data": {
        "id": 123,
        "name": "John Doe",
        "email": "john@example.com",
        "created_at": "2023-01-15T10:30:00Z",
        "updated_at": "2023-01-20T14:15:00Z"
    },
    "meta": {
        "version": "1.0",
        "timestamp": "2023-01-20T14:15:00Z"
    }
}
\`\`\`

Following these principles ensures your APIs are intuitive, consistent, and maintainable!`
      }
    ]
  }
];

const iconComponents = {
  Code,
  Zap, 
  Server,
  Rocket,
  Layers,
  BookOpen,
  Mail
};

export function CourseGrid({ onCourseSelect }: CourseGridProps) {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Master Modern Programming
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in">
            Elite text-based courses for Golang, Rust, and Microservices
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              100% Free Content
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              In-Depth Text Lessons  
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              Premium Code Examples
            </Badge>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive courses designed for serious developers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const IconComponent = iconComponents[course.icon as keyof typeof iconComponents];
              
              return (
                <Card
                  key={course.id}
                  className="group cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:shadow-blue-500/25 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => onCourseSelect(course)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </CardTitle>
                    <Badge
                      variant={course.difficulty === 'Beginner' ? 'default' : 'destructive'}
                      className="w-fit mx-auto"
                    >
                      {course.difficulty}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                      {course.description}
                    </CardDescription>
                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {course.lessons.length} lessons
                      </span>
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                        <span className="text-blue-600 dark:text-blue-400 text-lg">→</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose CodeMaster Pro?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Text-First Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Deep, comprehensive written content that you can read at your own pace
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Premium Code Examples
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Syntax-highlighted code blocks with copy functionality
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Community Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Engage with fellow learners through comments and discussions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
