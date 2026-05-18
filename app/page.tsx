import Navbar from "./components/Navbar";
import HalideTopoHero from "./components/HalideTopoHero";
import ExperienceSection from "./components/ExperienceSection";
import PortfolioSection from "./components/PortfolioSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-gray-900">
      <Navbar />
      <HalideTopoHero />
      <ExperienceSection />
      <PortfolioSection />
      <Footer />
    </main>
  );
}
