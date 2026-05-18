import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ExperienceSection from "./components/ExperienceSection";
import PortfolioSection from "./components/PortfolioSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-gray-900">
      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <PortfolioSection />
      <Footer />
    </main>
  );
}
