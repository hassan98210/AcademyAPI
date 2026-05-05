import { useEffect, useState } from 'react';
import { deleteStudent, getStudents } from '../services/studentService';
import Loading from '../components/Loading';
import { useAuth } from '../contexts/AuthContext';

export default function Students() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.role === 'Admin') {
      loadStudents();
    }
  }, [user]);

  const loadStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      setStudents(await getStudents());
    } catch {
      setError('Unable to load students.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student account?')) return;
    try {
      await deleteStudent(id);
      setStudents(students.filter((student) => student.id !== id));
    } catch {
      setError('Unable to remove student.');
    }
  };

  if (user?.role !== 'Admin') {
    return (
      <section className="page-card">
        <h2>Students</h2>
        <p>Only admins can view the full student list. Register a new student from the registration page.</p>
      </section>
    );
  }

  return (
    <section className="page-card">
      <div className="page-heading">
        <div>
          <h2>Student Accounts</h2>
          <p>Admin area: review and delete registered student profiles.</p>
        </div>
      </div>

      {loading && <Loading />}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="grid-list">
        {students.map((student) => (
          <article key={student.id} className="data-card">
            <h3>{student.fullName}</h3>
            <p>{student.email}</p>
            <p>
              <strong>Role:</strong> {student.role}
            </p>
            <button className="button button-secondary" onClick={() => handleDelete(student.id)}>
              Delete
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
