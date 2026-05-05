# AcademyAPI - Full-Stack Course Management System

A comprehensive full-stack application for managing university courses, instructors, students, and enrollments. Features an ASP.NET Core 10 Web API backend with JWT authentication, role-based access control, Swagger documentation, and a modern React frontend with authentication, routing, and course management UI.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running Both Together](#running-both-together)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Security Considerations](#security-considerations)
- [Testing](#testing)

## ✨ Features

### Backend API
- **JWT-Based Authentication**: Secure token-based authentication for Instructors and Students
- **Role-Based Access Control**: Enforce permissions based on user roles (Admin, Instructor, Student)
- **Course Management**: Full CRUD operations for course management
- **Student Enrollment**: Students can enroll in courses with grade tracking
- **Instructor Management**: Manage instructor profiles and course assignments
- **Automatic Admin Seeding**: API auto-creates an admin user on first run
- **Swagger/OpenAPI Documentation**: Interactive API documentation with authentication support
- **Password Hashing**: Secure password storage using BCrypt
- **Entity Framework Core**: Type-safe ORM with SQLite database

### Frontend UI
- **User Authentication**: Login/logout with JWT token management
- **Protected Routes**: Role-based route protection
- **Course Listing**: Browse all available courses
- **Student Enrollment**: Enroll in courses and track status
- **Course Management**: Create and edit courses (Instructor/Admin)
- **Responsive Design**: Mobile-friendly interface using React and Vite
- **API Integration**: Seamless communication with backend API
- **Loading States**: User-friendly loading indicators

## 📦 Prerequisites

### Backend
- **.NET 10 SDK** or later ([Download](https://dotnet.microsoft.com/download))

### Frontend
- **Node.js** 16.x or later ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)

### General
- **Git** (optional, for cloning)
- A terminal or command prompt

## 🚀 Quick Start

This project consists of two main components:
- **Backend**: ASP.NET Core 10 Web API (runs on port 7001)
- **Frontend**: React + Vite (runs on port 5173)

### Clone/Extract the Project

```bash
cd d:\web\ pro\AcademyAPI
```

## 🔌 Backend Setup

### 1. Run the Backend API

From the root directory:

```bash
dotnet run
```

The API will:
- Create the SQLite database (`AcademyDB.db`) if it doesn't exist
- Automatically seed an Admin user with credentials:
  - **Email**: `admin@academy.com`
  - **Password**: `Admin123!`
- Start on `https://localhost:7001`

### 2. Access Swagger Documentation

Open your browser and navigate to:
```
https://localhost:7001/swagger
```

### 3. Test Backend Authentication

1. Use the `/api/auth/login` endpoint with admin credentials:
   ```json
   {
     "email": "admin@academy.com",
     "password": "Admin123!"
   }
   ```
2. Copy the returned JWT token
3. Click the **Authorize** button in Swagger and paste: `Bearer <your-token>`

---

## 🎨 Frontend Setup

### 1. Install Frontend Dependencies

Navigate to the frontend directory and install npm packages:

```bash
cd frontend
npm install
```

### 2. Run the Frontend Development Server

```bash
npm run dev
```

The frontend will:
- Start on `http://localhost:5173`
- Automatically open in your default browser
- Hot-reload on file changes

### 3. Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 🚀 Running Both Together

### Terminal 1 - Start Backend

```bash
cd d:\web\ pro\AcademyAPI
dotnet run
# API runs on https://localhost:7001
```

### Terminal 2 - Start Frontend

```bash
cd d:\web\ pro\AcademyAPI\frontend
npm run dev
# Frontend runs on http://localhost:5173
```

Both applications communicate via HTTP requests. The frontend is already configured to call the backend API at `https://localhost:7001`.

---

## 📁 Project Structure

```
AcademyAPI/
├── Controllers/           # API endpoints (Auth, Courses, Students, etc.)
├── Services/              # Business logic layer
│   ├── Interfaces/        # Service interfaces
│   ├── CourseService.cs
│   ├── StudentService.cs
│   ├── InstructorService.cs
│   └── EnrollmentService.cs
├── Models/                # Domain models
│   ├── Student.cs
│   ├── Instructor.cs
│   ├── Course.cs
│   ├── Enrollment.cs
│   └── InstructorProfile.cs
├── DTOs/                  # Data Transfer Objects
│   ├── Auth/
│   ├── Student/
│   ├── Course/
│   ├── Instructor/
│   └── Enrollment/
├── Data/                  # Database context
│   └── AppDbContext.cs
├── Migrations/            # EF Core migrations
├── Program.cs             # App configuration & startup
├── appsettings.json       # Configuration (DB, JWT, etc.)
├── AcademyAPI.http        # Sample HTTP requests
├── AcademyAPI.csproj      # Project file
│
└── frontend/              # React + Vite Frontend
    ├── src/
    │   ├── main.jsx       # App entry point
    │   ├── App.jsx        # Root component
    │   ├── App.css        # Styles
    │   ├── index.css      # Global styles
    │   ├── assets/        # Images, fonts, etc.
    │   ├── components/    # Reusable components
    │   │   ├── NavBar.jsx        # Navigation bar
    │   │   ├── Loading.jsx       # Loading indicator
    │   │   └── ProtectedRoute.jsx # Route protection
    │   ├── pages/         # Page components
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Courses.jsx
    │   │   ├── CourseForm.jsx
    │   │   ├── Students.jsx
    │   │   ├── StudentRegister.jsx
    │   │   ├── Enrollments.jsx
    │   │   ├── Instructors.jsx
    │   │   └── NotFound.jsx
    │   ├── contexts/      # React Context (Auth)
    │   │   └── AuthContext.jsx
    │   └── services/      # API client services
    │       ├── api.js            # Axios instance
    │       ├── authService.js
    │       ├── courseService.js
    │       ├── studentService.js
    │       ├── enrollmentService.js
    │       └── instructorService.js
    ├── public/            # Static assets
    ├── package.json       # Frontend dependencies
    ├── vite.config.js     # Vite configuration
    └── index.html         # HTML entry point
```

## 🛠️ Technologies

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| ASP.NET Core | 10.0 | Web API framework |
| Entity Framework Core | 10.0 | ORM for database access |
| SQLite | - | Lightweight relational database |
| JWT Bearer | - | Token-based authentication |
| BCrypt.Net-Next | - | Secure password hashing |
| Swashbuckle | - | Swagger/OpenAPI documentation |

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.x | JavaScript library for UI |
| Vite | 5.x | Fast build tool and dev server |
| React Router | 6.x | Client-side routing |
| Axios | 1.x | HTTP client for API calls |
| CSS3 | - | Styling and responsive design |

## 🗄️ Database Schema

### Instructor
```
- Id (int, PK)
- FullName (string, max 100)
- Email (string, unique)
- PasswordHash (string)
- Role (string) = "Instructor" | "Admin"
- Profile (InstructorProfile, nav)
- Courses (ICollection<Course>, nav)
```

### InstructorProfile
```
- Id (int, PK)
- Bio (string)
- InstructorId (int, FK)
- Instructor (Instructor, nav)
```

### Course
```
- Id (int, PK)
- Title (string, max 100)
- Description (string, optional)
- Credits (int, 1-6)
- InstructorId (int, FK)
- Instructor (Instructor, nav)
- Enrollments (ICollection<Enrollment>, nav)
```

### Student
```
- Id (int, PK)
- FullName (string, max 100)
- Email (string, unique)
- PasswordHash (string)
- Role (string) = "Student"
- Enrollments (ICollection<Enrollment>, nav)
```

### Enrollment
```
- Id (int, PK)
- StudentId (int, FK)
- CourseId (int, FK)
- EnrollmentDate (DateTime)
- Grade (string, nullable)
- Student (Student, nav)
- Course (Course, nav)
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Login (Instructor or Student) | None |

**Request Body:**
```json
{
  "email": "admin@academy.com",
  "password": "Admin123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

### Instructors

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/instructors` | List all instructors | JWT (Admin) |
| POST | `/api/instructors` | Create instructor | JWT (Admin) |
| PUT | `/api/instructors/{id}` | Update instructor | JWT (Admin/Self) |
| DELETE | `/api/instructors/{id}` | Delete instructor | JWT (Admin) |

### Courses

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/courses` | List all courses | None |
| POST | `/api/courses` | Create course | JWT (Instructor/Admin) |
| PUT | `/api/courses/{id}` | Update course | JWT (Instructor/Admin) |
| DELETE | `/api/courses/{id}` | Delete course | JWT (Admin) |

### Students

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/students/register` | Register new student | None |
| GET | `/api/students/{id}` | Get student details | JWT (Admin/Self) |
| DELETE | `/api/students/{id}` | Delete student | JWT (Admin) |

### Enrollments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/enrollments` | Create enrollment | JWT (Student/Admin) |
| PUT | `/api/enrollments/{id}/grade` | Assign grade | JWT (Instructor/Admin) |
| GET | `/api/enrollments/student/{studentId}` | List student enrollments | JWT (Admin/Self) |

## 🔐 Authentication & Authorization

### JWT Token Structure

The API uses JWT tokens with the following claims:
- `sub` (subject): User ID
- `email`: User email
- `role`: User role (Admin, Instructor, Student)
- `iat` (issued at): Token creation time
- `exp` (expiration): Token expiration time (default: 1 hour)

### Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Admin** | Full access to all endpoints |
| **Instructor** | Create/Update courses, Assign grades, View enrollments |
| **Student** | View courses, Enroll in courses, View own enrollments |

### Using the Token

Include the token in all authenticated requests:
```
Authorization: Bearer <your-jwt-token>
```

## 🛡️ Security Considerations

### Password Security
- All passwords are hashed using **BCrypt** before storage
- Never store plain-text passwords
- Minimum password strength should be enforced in production

### HTTP-Only Cookies vs. JWT

This API uses **JWT Bearer tokens** for flexibility. For browser-based clients, consider:

**HTTP-Only Cookies** (Recommended for web apps):
- Cannot be accessed by JavaScript (`document.cookie`)
- Prevents XSS token theft
- Use flags: `HttpOnly`, `Secure`, `SameSite=Strict`

**JWT in localStorage** (Current approach):
- More flexible for SPAs and mobile apps
- Vulnerable to XSS attacks
- Requires strong XSS prevention measures

### HTTPS
- Always use HTTPS in production (never HTTP)
- JWT tokens can be intercepted over unencrypted connections

### CORS
- Configure CORS carefully to only allow trusted origins
- Avoid wildcard (`*`) in production

### Environment Variables
- Never commit sensitive data (JWT key, database connection strings) to version control
- Use `appsettings.Production.json` or environment variables in production

**In `appsettings.json`:**
```json
{
  "Jwt": {
    "Key": "YOUR-SUPER-SECRET-KEY-MIN-32-CHARS",
    "Issuer": "AcademyAPI",
    "Audience": "AcademyAPI"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=AcademyDB.db"
  }
}
```

⚠️ **Change the JWT Key** before deploying to production!

## 🧪 Testing

### Manual Testing with Swagger

1. Start the API: `dotnet run`
2. Open `https://localhost:7001/swagger`
3. Login via `/api/auth/login` with admin credentials
4. Click **Authorize** and paste the token
5. Test other endpoints

### Sample Workflow

1. **Register a Student**
   ```
   POST /api/students/register
   {
     "fullName": "John Doe",
     "email": "john@example.com",
     "password": "Pass123!"
   }
   ```

2. **Create a Course** (as Instructor/Admin)
   ```
   POST /api/courses
   {
     "title": "C# Basics",
     "description": "Learn C# fundamentals",
     "credits": 3,
     "instructorId": 1
   }
   ```

3. **Enroll in Course** (as Student)
   ```
   POST /api/enrollments
   {
     "studentId": 1,
     "courseId": 1
   }
   ```

4. **Assign Grade** (as Instructor/Admin)
   ```
   PUT /api/enrollments/1/grade
   {
     "grade": "A"
   }
   ```

### HTTP Requests File

Check `AcademyAPI.http` for pre-configured sample requests you can run directly in VS Code with the REST Client extension.

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
dotnet run --urls "https://localhost:7002"
```

**Database file not found:**
The API automatically creates `AcademyDB.db` on first run. Ensure write permissions in the project directory.

**JWT Token invalid:**
- Verify the token hasn't expired (default: 1 hour)
- Check that the JWT Key in `appsettings.json` matches the one used to generate the token

**CORS errors:**
Configure CORS in `Program.cs` if calling from a different domain.

### Frontend Issues

**Dependencies not installing:**
```bash
cd frontend
npm install --legacy-peer-deps
```

**Port 5173 already in use:**
```bash
npm run dev -- --port 5174
```

**Cannot connect to backend:**
- Verify backend is running on `https://localhost:7001`
- Check `frontend/src/services/api.js` for correct API base URL
- Ensure HTTPS is used (not HTTP) for API calls

**Blank page on startup:**
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for JavaScript errors
- Verify Node.js version: `node --version` (should be 16.x or later)

**Hot reload not working:**
- Try restarting the dev server: `npm run dev`
- Check that Vite is properly configured in `vite.config.js`

### General Issues

**Both servers need to run simultaneously:**
- Open two terminal windows/tabs
- Run backend in one, frontend in the other
- Both must be running for the full application to work

**API calls return 404:**
- Ensure backend server is running
- Verify the endpoint path is correct
- Check Network tab in browser DevTools for actual request URL

---

**Last Updated:** May 2026 | **Maintained by:** Academy Development Team | **Full-Stack Project**: Backend API + React Frontend
