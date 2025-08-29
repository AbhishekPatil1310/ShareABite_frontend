import Hero from '../components/Hero';
import About from '../components/About';
import ScrollToTopButton from '../components/ScroleToTop'
import Footer from '../components/footer'

export default function Landing() {
  return (
    <main className="font-sans">
      <ScrollToTopButton/>
        <Hero />
      <About />
      <Footer/>
    </main>
  );
}
