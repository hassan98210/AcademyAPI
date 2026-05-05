import { useState } from 'react';
import { registerStudent } from '../services/studentService';

export default function StudentRegister() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

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
      const data = await registerStudent(form);
      setMessage(`Student registered: ${data.fullName} (${data.email})`);
      setForm({ fullName: '', email: '', password: '' });
    } catch {
      setError('Registration failed. Please check the form and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-card form-page">
      <div className="page-heading">
        <div>
          <h2>Register as a Student</h2>
          <p>Create a new student account to access enrollments and courses.</p>
        </div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

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
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} />
        </label>
        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register Student'}
        </button>
      </form>
    </section>
  );
}
