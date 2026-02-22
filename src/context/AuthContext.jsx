import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Optional: persist login across refresh
  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const isAuthenticated = user !== null;

  const login = (username, password, role = 'regular') => {
    if (!username || !password) throw new Error('Missing username or password');

    const mockToken = `mock_jwt_${Date.now()}`;
    const userData = { username, role, token: mockToken };

    setUser(userData);
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('authUser', JSON.stringify(userData));

    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  const hasRole = (role) => user?.role === role;
  const isAdmin = () => hasRole('admin');

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, hasRole, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
