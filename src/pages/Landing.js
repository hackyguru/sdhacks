import React from "react";
import Tilt from "react-parallax-tilt";
import TextLoop from "react-text-loop";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div className="flex-column bg-gradient-to-r from-yellow-200 to-yellow-200">
      <Navbar />
      <Hero />
    </div>
  );
}
