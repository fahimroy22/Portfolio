import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import CTA from "../components/CTA";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import SocialBar from "../components/SocialBar";
import InteractionLayer from "../components/InteractionLayer";

export default function Home() {
  return (
    <>
      <InteractionLayer />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Skills />
      <Experience />
      <CTA />
      <Contact />
      <Footer />
      <SocialBar />
    </>
  );
}