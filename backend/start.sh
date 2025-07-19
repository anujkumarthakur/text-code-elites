
#!/bin/bash

echo "🚀 Starting CodeMaster API Server..."
echo "📍 Server will be available at: http://localhost:8080"
echo "🩺 Health check endpoint: http://localhost:8080/health"
echo "📚 API documentation: http://localhost:8080/api/v1"
echo ""

# Check if Go is installed
if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Please install Go 1.21 or higher."
    echo "   Visit: https://golang.org/doc/install"
    exit 1
fi

# Check Go version
GO_VERSION=$(go version | cut -d' ' -f3 | cut -d'o' -f2)
echo "✅ Go version: $GO_VERSION"

# Initialize and download dependencies
echo "📦 Installing dependencies..."
go mod tidy

# Start the server
echo "🔄 Starting server..."
go run main.go
