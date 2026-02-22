import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ArticlesProvider } from './context/ArticlesContext';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SavedArticlesPage from './pages/SavedArticlesPage';
import AdminPage from './pages/AdminPage';

import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ArticlesProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />

              {/* Step 4: login route */}
              <Route path="/login" element={<Login />} />

              {/* Step 5: protect saved */}
              <Route
                path="/saved"
                element={
                  <ProtectedRoute>
                    <SavedArticlesPage />
                  </ProtectedRoute>
                }
              />

              {/* Step 7: protected admin route */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ArticlesProvider>
    </AuthProvider>
  );
}

export default App;
