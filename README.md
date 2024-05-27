# Todo API

## Overview

This is a Node.js-based backend application for managing tasks data. It provides a RESTful API built with Express.js and uses MySQL as the database. Authentication is handled using JWT and bcryptjs for password hashing.

## Features

- User authentication and authorization
- CRUD operations for task data
- Logging with Winston
- Environment variable management with dotenv

## Prerequisites

- Docker
- Docker Compose

## API Endpoints

POST /auth/login - User login
POST /auth/register - User registration
GET /todos - Get all tasks
GET /todo/:id - Get task by ID
PUT /todos/:id - Update a task
DELETE /todos/:id - Delete a task


## Getting Started

- **Clone the Repository**: Step to clone the repository from the given URL.
- **Environment Variables**: Instructions to create a `.env` file and set up necessary environment variables for the database and JWT.
    * Create a .env file in the root directory and add your environment variables:
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret

- **Docker Setup**: Ensure Docker and Docker Compose are installed.
    * Ensure Docker and Docker Compose are installed on your system.

- **Build and Run the Docker Container**: Command to build and run the Docker containers, making the application available on port 9010.

    * Build and start the Docker containers using Docker Compose:
    docker-compose up --build
    * This command will build the Docker image and start the container. The application will be available on port 9010.
- **API Endpoints**: List of available API endpoints.
- **Scripts**: Script to start the application.
    * Scripts
    * start - Start the application with node --watch

### Clone the Repository

```bash
git clone <repository-url>
cd employee-api

