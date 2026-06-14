import Navbar from "./components/Navbar";
import HalideTopoHero from "./components/HalideTopoHero";
import ExperienceSection from "./components/ExperienceSection";
import PortfolioSection from "./components/PortfolioSection";
import Footer from "./components/Footer";
import { getProjects } from "./projects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="bg-gray-900">
      <Navbar />
      <HalideTopoHero />
      <ExperienceSection />
      <PortfolioSection projects={projects} />
      <Footer />
    </main>
  );
}
