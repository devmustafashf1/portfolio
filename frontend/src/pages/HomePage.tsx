import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import FeaturedWork from '../components/FeaturedWork';
import ReviewsBar from '../components/ReviewsBar';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <FeaturedWork />
      <ReviewsBar />
      <Contact />
    </>
  );
}