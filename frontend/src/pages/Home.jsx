import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="page-card home-page">
      <div className="hero-panel">
        <div>
          <span className="eyebrow">Academy React Client</span>
          <h1>Professional academy dashboard</h1>
          <p>
            This frontend is built to connect with the Academy API. Browse courses,
            register students, manage instructors, and track enrollments with real API calls.
          </p>
          <div className="button-row">
            <Link className="button" to="/courses">Explore Courses</Link>
            <Link className="button button-secondary" to="/students/register">Register Student</Link>
          </div>
        </div>
        <div className="hero-panel__meta">
          <div className="meta-card">
            <strong>API base URL</strong>
            <p>{import.meta.env.VITE_API_BASE_URL || 'http://localhost:5007'}</p>
          </div>
          <div className="meta-card">
            <strong>Demo login</strong>
            <p>admin@academy.com / Admin123!</p>
          </div>
          <div className="meta-card">
            <strong>Current user</strong>
            <p>{user ? `${user.email} (${user.role})` : 'Not logged in'}</p>
          </div>
        </div>
      </div>

      <div className="feature-grid">
        <article className="feature-card">
          <h2>Courses</h2>
          <p>View all courses, create new ones, and update existing course details.</p>
          <Link className="text-link" to="/courses">Open courses</Link>
        </article>
        <article className="feature-card">
          <h2>Students</h2>
          <p>Register new students and, when signed in as admin, review student accounts.</p>
          <Link className="text-link" to="/students/register">Register student</Link>
        </article>
        <article className="feature-card">
          <h2>Enrollments</h2>
          <p>Manage course enrollments, grade records, and track student enrollments.</p>
          <Link className="text-link" to="/enrollments">View enrollments</Link>
        </article>
        <article className="feature-card">
          <h2>Instructors</h2>
          <p>Create instructors, assign courses, and manage instructor data if you are admin.</p>
          <Link className="text-link" to="/instructors">Instructor admin</Link>
        </article>
      </div>
    </section>
  );
}
