#!/bin/bash

MAX_RETRIES=30
RETRY_INTERVAL=2

# Function to check if Docker is running
check_docker() {
    docker info >/dev/null 2>&1
    return $?
}

# Function to check if PostgreSQL is ready
check_postgres() {
    docker exec upward-db pg_isready >/dev/null 2>&1
    return $?
}

# Start Docker if not running
if ! check_docker; then
    echo "🐳 Starting Docker..."
    open -a Docker

    # Wait for Docker to start with timeout
    retries=0
    while ! check_docker && [ $retries -lt $MAX_RETRIES ]; do
        echo "⏳ Waiting for Docker to start (attempt $((retries + 1))/$MAX_RETRIES)..."
        sleep $RETRY_INTERVAL
        retries=$((retries + 1))
    done

    if ! check_docker; then
        echo "❌ Failed to start Docker after $((MAX_RETRIES * RETRY_INTERVAL)) seconds"
        echo "Please start Docker manually and try again"
        exit 1
    fi
fi

echo "✅ Docker is running"

# Check if the container exists
if docker ps -a --format '{{.Names}}' | grep -q '^upward-db$'; then
    # Container exists, check if it's running
    if ! docker ps --format '{{.Names}}' | grep -q '^upward-db$'; then
        echo "🔄 Starting existing upward-db container..."
        docker start upward-db
    else
        echo "✅ upward-db container is already running"
    fi
else
    echo "🚀 Creating new upward-db container..."
    docker run --name upward-db \
        -e POSTGRES_DB=upward_db \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=postgres \
        -p 5433:5432 \
        -d postgres:15
fi

# Wait for PostgreSQL to be ready with timeout
echo "⏳ Waiting for PostgreSQL to be ready..."
retries=0
while ! check_postgres && [ $retries -lt $MAX_RETRIES ]; do
    echo "⏳ PostgreSQL is starting up (attempt $((retries + 1))/$MAX_RETRIES)..."
    sleep $RETRY_INTERVAL
    retries=$((retries + 1))
done

if ! check_postgres; then
    echo "❌ Failed to start PostgreSQL after $((MAX_RETRIES * RETRY_INTERVAL)) seconds"
    echo "Check Docker logs with: docker logs upward-db"
    exit 1
fi

echo "✅ PostgreSQL is ready!"

# Run database migrations
echo "🔄 Running database migrations..."
cd "$(dirname "$0")/.." || exit 1

# Debug: Show which env file is being used
if [ -f .env.local ]; then
    echo "📄 Using .env.local file"
    export $(cat .env.local | grep -v '^#' | xargs)
elif [ -f .env ]; then
    echo "📄 Using .env file"
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ No .env or .env.local file found"
    exit 1
fi

echo "🔍 Using DATABASE_URL: ${DATABASE_URL}"

# Generate Prisma client
if ! pnpm prisma generate; then
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

# Run migrations
if ! pnpm prisma migrate deploy; then
    echo "❌ Failed to run database migrations"
    echo "Check if the database is accessible and try again"
    exit 1
fi

echo "✅ Database migrations completed successfully"
