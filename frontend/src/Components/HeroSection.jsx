import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="relative h-[80vh] min-h-[600px]">
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-2 opacity-60">
            {[
              'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
              'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
              'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
              'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
              'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
              'https://images.unsplash.com/photo-1484723091739-30a097e8f929',
              'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
              'https://images.unsplash.com/photo-1539136788836-5699e78bfc75'
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