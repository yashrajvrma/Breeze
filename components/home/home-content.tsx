import Footer from "./footer";
import Hero from "./hero";
import Navbar from "./navbar";

import HeroImg from "./hero-img";

export default function HomeContent() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Hero />
      <HeroImg />
      <Footer />
    </div>
  );
}
