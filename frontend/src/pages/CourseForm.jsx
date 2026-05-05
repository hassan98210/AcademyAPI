import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createCourse, getCourseById, updateCourse } from '../services/courseService';
import { getInstructors } from '../services/instructorService';
import Loading from '../components/Loading';

export default function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ title: '', description: '', credits: 3, instructorId: '' });
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const isEdit = Boolean(id);
  const isAllowed = user?.role === 'Admin' || user?.role === 'Instructor';

  useEffect(() => {
    if (!isAllowed) return;
    loadInstructors();
    if (id) loadCourse();
  }, [id, isAllowed]);

  const loadInstructors = async () => {
    try {
      const results = await getInstructors();
      setInstructors(results);
      if (!form.instructorId && results[0]) {
        setForm((prev) => ({ ...prev, instructorId: results[0].id }));
      }
    } catch {
      setError('Unable to load instructors.');
    }
  };

  const loadCourse = async () => {
    setLoading(true);
    try {
      const course = await getCourseById(id);
      setForm({
        title: course.title || '',
        description: course.description || '',
        credits: course.credits || 3,
        instructorId: course.instructorId || '',
      });
    } catch {
      setError('Unable to load course.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: name === 'credits' ? Number(value) : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEdit) {
        await updateCourse(id, form);
        setSuccess('Course updated successfully.');
      } else {
        await createCourse(form);
        setSuccess('Course created successfully. Redirecting...');
      }
      setTimeout(() => navigate('/courses'), 1000);
    } catch {
      setError('Unable to save course. Please verify your data and role permissions.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAllowed) {
    return (
      <section className="page-card">
        <h2>Not authorized</h2>
        <p>Only instructors and admins can create or edit courses.</p>
      </section>
    );
  }

  return (
    <section className="page-card form-page">
      <div className="page-heading">
        <div>
          <h2>{isEdit ? 'Edit Course' : 'Create Course'}</h2>
          <p>{isEdit ? 'Update course details.' : 'Create a new course record.'}</p>
        </div>
      </div>

      {loading && <Loading />}
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form className="form-stack" onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" />
        </label>

        <label>
          Credits
          <input
            name="credits"
            type="number"
            min="1"
            max="6"
            value={form.credits}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Instructor
          <select name="instructorId" value={form.instructorId} onChange={handleChange} required>
            <option value="">Select an instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.fullName}
              </option>
            ))}
          </select>
        </label>

        <button className="button" type="submit">{isEdit ? 'Update Course' : 'Create Course'}</button>
      </form>
    </section>
  );
}
