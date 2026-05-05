import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="topbar">
      <div className="brand">Academy Client</div>
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/enrollments">Enrollments</NavLink>
        {user?.role === 'Admin' && <NavLink to="/instructors">Instructors</NavLink>}
      </nav>
      <div className="nav-actions">
        {user ? (
          <>
            <span className="role-chip">{user.role}</span>
            <button className="button button-secondary" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" className="button button-secondary">Login</NavLink>
        )}
      </div>
    </header>
  );
}
