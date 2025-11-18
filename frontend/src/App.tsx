import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from "./components/ProtectedRoute";

function ScrollHandler() {
  const location = useLocation();
  
  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);
  
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-6 md:py-12">
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
        <Route index element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/login" element={<LoginPage />} />
         <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminPage />
    </ProtectedRoute>
  }
/>

        
        <Route path="*" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
