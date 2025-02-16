# Task Management Application

This project is a full-stack task management application built with Node.js, Express, PostgreSQL, and React.

## Tech Stack

### Frontend

- React with Vite
- TailwindCSS for styling
- React Query for data fetching
- React Router for navigation
- React Hook Form for form handling
- Axios for API requests
- React Hot Toast for notifications

## Project Structure

```
├── backend/         # Backend API with Express
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── validation/    # Input validation schemas
│
├── frontend/        # React Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── auth/     # Authentication components
│   │   │   ├── task/     # Task-related components
│   │   │   └── common/   # Shared components
│   │   ├── context/      # React context
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Page components
│   │   └── services/     # API services
```

## Features Implemented

### Frontend

- Responsive design with TailwindCSS
- Form validation and error handling
- Protected routes and authentication flow
- Api calls with React Query
- User-friendly loading states
- Modal dialogs for task editing
- Persistent authentication and user info

## Setup Instructions

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment:

```bash
cp .env.example .env
```

Update `.env` with:

```
VITE_API_URL=http://localhost:5900/api
```

4. Start development server:

```bash
pnpm dev
```

## Backend Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database (Using Neon PostgreSQL)
- pnpm package manager

### Installation

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables:

```bash
cp .env.example .env
```

Update the `.env` file with your credentials:

```
PORT=5000
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secure_jwt_secret
```

### API Endpoints

#### Authentication

- `POST /api/users/register` - Register a new user
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- `POST /api/users/login` - Login user
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- `GET /api/users/me` - Get current user profile (Requires Authentication)

#### Tasks

- `GET /api/tasks` - Get all tasks (Requires Authentication)
- `POST /api/tasks` - Create a new task (Requires Authentication)
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending"
  }
  ```
- `PATCH /api/tasks/:id` - Update a task (Requires Authentication)
- `DELETE /api/tasks/:id` - Delete a task (Requires Authentication)

### Features Implemented

- User Authentication with JWT
- PostgreSQL Database with Sequelize ORM
- RESTful API Endpoints
- Input Validation
- Error Handling
- Secure Password Handling
