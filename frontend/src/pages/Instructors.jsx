import { useEffect, useState } from 'react';
import { createInstructor, deleteInstructor, getInstructors, updateInstructor } from '../services/instructorService';
import Loading from '../components/Loading';
import { useAuth } from '../contexts/AuthContext';

const initialForm = { fullName: '', email: '', password: '', bio: '', avatarUrl: '', linkedInUrl: '' };

export default function Instructors() {
  const { user } = useAuth();
  const [instructors, setInstructors] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.role === 'Admin') {
      loadInstructors();
    }
  }, [user]);

  const loadInstructors = async () => {
    setLoading(true);
    setError(null);
    try {
      setInstructors(await getInstructors());
    } catch {
      setError('Unable to load instructor list.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setMessage(null);
    setError(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (editingId) {
        await updateInstructor(editingId, form);
        setMessage('Instructor updated successfully.');
      } else {
        await createInstructor(form);
        setMessage('Instructor created successfully.');
      }
      resetForm();
      await loadInstructors();
    } catch {
      setError('Unable to save instructor.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (instructor) => {
    setEditingId(instructor.id);
    setForm({
      fullName: instructor.fullName || '',
      email: instructor.email || '',
      password: '',
      bio: instructor.bio || '',
      avatarUrl: instructor.avatarUrl || '',
      linkedInUrl: instructor.linkedInUrl || '',
    });
    setMessage(null);
    setError(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this instructor?')) return;
    try {
      await deleteInstructor(id);
      setInstructors(instructors.filter((item) => item.id !== id));
    } catch {
      setError('Unable to delete instructor.');
    }
  };

  if (user?.role !== 'Admin') {
    return (
      <section className="page-card">
        <h2>Instructor Administration</h2>
        <p>Only admins can manage instructors from this interface.</p>
      </section>
    );
  }

  return (
    <section className="page-card">
      <div className="page-heading">
        <div>
          <h2>Instructors</h2>
          <p>Manage instructors with create, update, and delete operations.</p>
        </div>
      </div>

      {loading && <Loading />}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="grid-list">
        {instructors.map((instructor) => (
          <article key={instructor.id} className="data-card">
            <h3>{instructor.fullName}</h3>
            <p>{instructor.email}</p>
            <p>
              <strong>Role:</strong> {instructor.role}
            </p>
            <div className="card-actions">
              <button className="button button-secondary" onClick={() => handleEdit(instructor)}>
                Edit
              </button>
              <button className="button button-secondary" onClick={() => handleDelete(instructor.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="form-panel">
        <h3>{editingId ? 'Update Instructor' : 'Create Instructor'}</h3>
        <form className="form-stack" onSubmit={handleSubmit}>
          <label>
            Full name
            <input name="fullName" value={form.fullName} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Password{editingId ? ' (leave blank to keep current)' : ''}
            <input name="password" type="password" value={form.password} onChange={handleChange} minLength={editingId ? 0 : 6} />
          </label>
          <label>
            Bio
            <textarea name="bio" value={form.bio} onChange={handleChange} rows="3" />
          </label>
          <label>
            Avatar URL
            <input name="avatarUrl" value={form.avatarUrl} onChange={handleChange} />
          </label>
          <label>
            LinkedIn URL
            <input name="linkedInUrl" value={form.linkedInUrl} onChange={handleChange} />
          </label>
          <div className="button-row">
            <button className="button" type="submit">{editingId ? 'Update Instructor' : 'Create Instructor'}</button>
            {editingId && <button type="button" className="button button-secondary" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      </div>
    </section>
  );
}
