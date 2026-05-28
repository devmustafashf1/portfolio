import Hero from '../components/Hero';
import ClientsRoller from '../components/ClientsRoller';
import Problems from '../components/Problems';
import Services from '../components/Services';
import FeaturedWork from '../components/FeaturedWork';
import HowItWorks from '../components/HowItWorks';
import About from '../components/About';
import ReviewsBar from '../components/ReviewsBar';
import CTABanner from '../components/CTABanner';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientsRoller />
      <Problems />
      <Services />
      <FeaturedWork />
      <HowItWorks />
      <About />
      <ReviewsBar />
      <CTABanner />
      <Contact />
    </>
  );
}
