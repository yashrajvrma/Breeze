"use client";

import Footer from "./footer";
import Hero from "./hero";
import Navbar from "./navbar";

export default function HomeContent() {
  return (
    <div className="h-screen">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
