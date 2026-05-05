import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);

    if (!email || !password) {
      setFormError('Please enter both email and password.');
      return;
    }

    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setFormError(err?.response?.data || 'Unable to sign in. Check credentials.');
    }
  };

  return (
    <section className="page-card form-page">
      <div className="form-panel">
        <h2>Sign in to the Academy</h2>
        <p>Use the seeded admin account to manage all backend resources.</p>
        <form onSubmit={handleSubmit} className="form-stack">
          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>

          {(formError || error) && <div className="alert alert-error">{formError || error}</div>}

          <button className="button" disabled={loading} type="submit">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="hint-card">
          <strong>Demo admin credentials</strong>
          <p>admin@academy.com / Admin123!</p>
        </div>
      </div>
    </section>
  );
}
