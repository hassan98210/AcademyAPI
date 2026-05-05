import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  createEnrollment,
  deleteEnrollment,
  getEnrollments,
  getEnrollmentsForStudent,
  updateEnrollmentGrade,
} from '../services/enrollmentService';
import { getCourses } from '../services/courseService';
import { getStudents } from '../services/studentService';
import Loading from '../components/Loading';

const initialForm = { studentId: '', courseId: '', grade: '' };

export default function Enrollments() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [gradeInputs, setGradeInputs] = useState({});

  const isAdmin = user?.role === 'Admin';
  const isStudent = user?.role === 'Student';

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [courseResults, studentResults] = await Promise.all([getCourses(), getStudents().catch(() => [])]);
      setCourses(courseResults);
      setStudents(studentResults);
      if (isAdmin) {
        setEnrollments(await getEnrollments());
      } else if (isStudent) {
        setEnrollments(await getEnrollmentsForStudent(user.id));
        setForm((prev) => ({ ...prev, studentId: user.id }));
      }
    } catch {
      setError('Unable to load enrollment data.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const created = await createEnrollment({ studentId: Number(form.studentId), courseId: Number(form.courseId) });
      setEnrollments((prev) => [...prev, created]);
      setMessage('Enrollment created successfully.');
      setForm((prev) => ({ ...prev, courseId: '' }));
    } catch {
      setError('Unable to create enrollment.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enrollment?')) return;
    try {
      await deleteEnrollment(id);
      setEnrollments(enrollments.filter((item) => item.id !== id));
    } catch {
      setError('Unable to delete enrollment.');
    }
  };

  const handleUpdateGrade = async (id) => {
    const grade = gradeInputs[id];
    if (!grade) return;
    try {
      await updateEnrollmentGrade(id, grade);
      setEnrollments((prev) => prev.map((item) => (item.id === id ? { ...item, grade } : item)));
      setMessage('Grade updated successfully.');
    } catch {
      setError('Unable to update grade.');
    }
  };

  if (!user) {
    return (
      <section className="page-card">
        <h2>Enrollments</h2>
        <p>Please log in as a student or admin to view enrollment data.</p>
      </section>
    );
  }

  if (!isAdmin && !isStudent) {
    return (
      <section className="page-card">
        <h2>Enrollments</h2>
        <p>Only admin and student accounts can view enrollment records from this page.</p>
      </section>
    );
  }

  return (
    <section className="page-card">
      <div className="page-heading">
        <div>
          <h2>Enrollments</h2>
          <p>Track enrolled students and assign grades to completed classes.</p>
        </div>
      </div>

      {loading && <Loading />}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <article className="form-panel">
        <h3>Create Enrollment</h3>
        <form className="form-stack" onSubmit={handleCreate}>
          {isAdmin && (
            <label>
              Student
              <select name="studentId" value={form.studentId} onChange={handleChange} required>
                <option value="">Choose a student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.fullName}
                  </option>
                ))}
              </select>
            </label>
          )}

          {isStudent && (
            <div className="info-row">Student ID: {user.id}</div>
          )}

          <label>
            Course
            <select name="courseId" value={form.courseId} onChange={handleChange} required>
              <option value="">Choose a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>
          <button className="button" type="submit">Create Enrollment</button>
        </form>
      </article>

      <div className="grid-list">
        {enrollments.map((item) => (
          <article key={item.id} className="data-card">
            <h3>{item.courseTitle || 'Unknown course'}</h3>
            <p>
              <strong>Student:</strong> {item.studentName}
            </p>
            <p>
              <strong>Grade:</strong> {item.grade || 'Not graded'}
            </p>
            <p>
              <strong>Enrolled:</strong> {new Date(item.enrolledAt).toLocaleDateString()}
            </p>
            {isAdmin && (
              <div className="card-actions">
                <label className="grade-field">
                  <span>Grade</span>
                  <input
                    value={gradeInputs[item.id] ?? item.grade ?? ''}
                    onChange={(event) => setGradeInputs((prev) => ({ ...prev, [item.id]: event.target.value }))}
                  />
                </label>
                <button className="button button-secondary" onClick={() => handleUpdateGrade(item.id)}>
                  Update Grade
                </button>
                <button className="button button-secondary" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
