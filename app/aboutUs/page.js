"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] flex items-center justify-center bg-blue-500 text-white text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold"
        >
          Welcome to Our Company
        </motion.h1>
      </div>
      
      {/* Our Mission */}
      <div className="container mx-auto py-12 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-semibold mb-6"
        >
          Our Mission
        </motion.h2>
        <p className="max-w-3xl mx-auto text-lg">
          We are committed to revolutionizing the e-commerce industry by providing seamless and efficient logistics solutions. Our goal is to ensure timely and hassle-free deliveries for businesses and consumers alike.
        </p>
      </div>
      
      {/* Our Operations */}
      <div className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Our Operations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image 1 */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative w-full h-64">
            <img
              src="https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk="
              alt="Shopping Online"
              layout="fill"
              
              className="rounded-lg shadow-md"
            />
          </motion.div>
          {/* Image 2 */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative w-full h-64">
            <img
              src="https://media.istockphoto.com/id/1311600080/photo/small-shipping-packages-on-a-notebook-with-the-inscription-online-shopping.jpg?s=612x612&w=0&k=20&c=vDPqIQsqzCvEaEZF2R5IeGz_8Gv-YRI_HzbKux8TaqM="
              alt="Shipping Packages"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </motion.div>
          {/* Image 3 */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative w-full h-64">
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgbUMmWHihw8FWaeAV1ChChcFGiyd1P_75K4LZXMi_FemjkYKb0CcQDO6ZhvL3TcSJoGq0v7W1Y4wpOr6fGY_KXNO18x9UMfbQnnPlANig9_zh9dtHO-NfXQxlIRIGtsOFkAH9_lrMkQ2kiW2FnDmdiT43U51c3Yzqb-1EmonKOvceoIWp4SJ2dZcqu/s16000-rw/Fulfilment%20Center_Coimbatore_Ecom%20Express.jpg"
              alt="Fulfillment Center"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-blue-500 text-white py-12 text-center mt-12">
        <h2 className="text-3xl font-bold mb-4">Partner with Us!</h2>
        <p className="max-w-xl mx-auto text-lg">
          Join us in redefining the logistics industry. Let's create seamless and efficient e-commerce solutions together.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
