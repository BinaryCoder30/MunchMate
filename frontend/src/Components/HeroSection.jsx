import React from 'react';
import { motion } from 'framer-motion';

// Import images
import food1 from '../assets/food-1.jpg';
import food2 from '../assets/food-2.jpg';
import food3 from '../assets/food-3.jpg';
import food4 from '../assets/food-4.jpg';
import food5 from '../assets/food-5.jpg';
import food6 from '../assets/food-6.jpg';
import food7 from '../assets/food-7.jpg';
import food8 from '../assets/food-8.jpg';

const HeroSection = () => {
  return (
    <div className="relative h-[80vh] min-h-[600px]">
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-2 opacity-60">
            {[
              food1,
              food2,
              food3,
              food4,
              food5,
              food6,
              food7,
              food8
            ].map((src, index) => (
              <img
                key={index}
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-center max-w-4xl"
        >
          <h1 className="text-7xl font-bold mb-6 tracking-tight">
            <span className="text-[#3498DB]">Munch</span>Mate
          </h1>
          <h2 className="text-4xl font-semibold mb-8 leading-tight">
            Discover the <span className="text-[#3498DB]">Perfect Bite</span> in Every Corner
          </h2>
          <p className="text-xl text-gray-200 mb-12">
            From street food to fine dining, explore the best restaurants in your city
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;