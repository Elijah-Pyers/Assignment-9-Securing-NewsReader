import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { getUserSavedArticles } = useArticles();

  const savedCount = isAuthenticated ? getUserSavedArticles().length : 0;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h1 className="nav-brand">NewsReader</h1>

          <div className="nav-links">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>

            <Link
              to="/search"
              className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
            >
              Search
            </Link>

            {/* Saved only visible when logged in */}
            {isAuthenticated && (
              <Link
                to="/saved"
                className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}
              >
                Saved Articles ({savedCount})
              </Link>
            )}

            {/* Admin only visible to admins */}
            {isAuthenticated && isAdmin() && (
              <Link
                to="/admin"
                className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
              >
                Admin
              </Link>
            )}
          </div>
        </div>

        <div className="nav-user">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>👤 {user.username}{isAdmin() ? ' (admin)' : ''}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
