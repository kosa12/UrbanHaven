"use client";

import TermsOfService from "../components/TermsOfService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Tos = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <TermsOfService />
      <Footer />
    </div>
  );
};

export default Tos;
