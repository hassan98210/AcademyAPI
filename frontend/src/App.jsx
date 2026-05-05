import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Courses from './pages/Courses';
import CourseForm from './pages/CourseForm';
import Students from './pages/Students';
import StudentRegister from './pages/StudentRegister';
import Instructors from './pages/Instructors';
import Enrollments from './pages/Enrollments';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-shell">
          <NavBar />
          <main className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/courses" element={<Courses />} />
              <Route
                path="/courses/new"
                element={
                  <ProtectedRoute roles={[ 'Admin', 'Instructor' ]}>
                    <CourseForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/courses/:id"
                element={
                  <ProtectedRoute roles={[ 'Admin', 'Instructor' ]}>
                    <CourseForm />
                  </ProtectedRoute>
                }
              />
              <Route path="/students" element={<Students />} />
              <Route path="/students/register" element={<StudentRegister />} />
              <Route
                path="/instructors"
                element={
                  <ProtectedRoute roles={[ 'Admin' ]}>
                    <Instructors />
                  </ProtectedRoute>
                }
              />
              <Route path="/enrollments" element={<Enrollments />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
