"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function AboutUs() {
  const [hover, setHover] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center bg-black text-white text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Brandenburg_gate.jpg"
          alt="Brandenburg Gate"
          width={500}
          height={300}
        />

        <h1 className="relative text-5xl font-bold">About Our Store</h1>
      </section>

      {/* Our Story */}
      <section className="py-16 px-8 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We started with a simple mission—to make online shopping seamless
            and enjoyable. Our platform brings you the best products with
            top-notch service.
          </p>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-8 md:px-20">
        <h2 className="text-3xl font-bold text-center">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {["High Quality", "Fast Delivery", "24/7 Support"].map(
            (feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-xl font-semibold">{feature}</h3>
                <p className="mt-2 text-gray-600">
                  We ensure the best quality, fastest delivery, and
                  round-the-clock support.
                </p>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* Interactive Section */}
      <section className="py-16 px-8 md:px-20 text-center">
        <h2 className="text-3xl font-bold">Our Customers Love Us!</h2>
        <motion.button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md"
        >
          {hover ? "Join Us Now!" : "See Testimonials"}
        </motion.button>
      </section>
    </div>
  );
}
