import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { deleteCourse, getCourses } from '../services/courseService';
import Loading from '../components/Loading';

export default function Courses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      setError('Unable to load courses.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await deleteCourse(id);
      setCourses(courses.filter((course) => course.id !== id));
    } catch {
      setError('Unable to remove course.');
    }
  };

  return (
    <section className="page-card">
      <div className="page-heading">
        <div>
          <h2>Courses</h2>
          <p>Browse all courses and manage them if you are an instructor or admin.</p>
        </div>
        {(user?.role === 'Admin' || user?.role === 'Instructor') && (
          <Link className="button" to="/courses/new">Create course</Link>
        )}
      </div>

      {loading && <Loading />}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="grid-list">
        {courses.map((course) => (
          <article key={course.id} className="data-card">
            <div className="card-content">
              <h3>{course.title}</h3>
              <p>{course.description || 'No description available.'}</p>
              <p>
                <strong>Credits:</strong> {course.credits}
              </p>
              <p>
                <strong>Instructor:</strong> {course.instructorName || 'Unassigned'}
              </p>
            </div>
            <div className="card-actions">
              <Link className="text-link" to={`/courses/${course.id}`}>View</Link>
              {(user?.role === 'Admin' || user?.role === 'Instructor') && (
                <button className="button button-secondary" onClick={() => handleDelete(course.id)}>
                  Delete
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
