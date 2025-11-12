import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedWork from './components/FeaturedWork';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/login';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <Login onBack={() => setShowLogin(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-6 md:py-12">
        <Header onLoginClick={() => setShowLogin(true)} />
        <Hero />
        <About  />
        <FeaturedWork />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
