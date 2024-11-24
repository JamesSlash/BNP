import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CreditSimulator from '../components/CreditSimulator';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section id="inicio">
          <Hero />
        </section>
        <Features />
        <section id="simulador">
          <CreditSimulator />
        </section>
      </main>
      <Footer />
    </div>
  );
}