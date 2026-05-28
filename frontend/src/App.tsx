import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import CaseStudyPage from './pages/CaseStudyPage';
import ProtectedRoute from "./components/ProtectedRoute";

function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-8">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollHandler />
      <Routes>
        <Route index element={<Layout><HomePage /></Layout>} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Layout><HomePage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
