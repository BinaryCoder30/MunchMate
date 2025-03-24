import React from 'react';

// Import collection images
import collection1 from '../assets/food-1.jpg'; // Reusing food-1 since it's the same image
import collection2 from '../assets/collection-2.jpg';
import collection3 from '../assets/collection-3.jpg';
import collection4 from '../assets/collection-4.jpg';

const Collections = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            name: 'Must-Try This Week',
            image: collection1
          },
          {
            name: 'Hidden Gems',
            image: collection2
          },
          {
            name: 'Date Night Spots',
            image: collection3
          },
          {
            name: 'Luxury Dining',
            image: collection4
          }
        ].map((collection) => (
          <div key={collection.name} className="relative rounded-lg overflow-hidden h-64 group cursor-pointer">
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">{collection.name}</h3>
              <p className="text-sm">12 Places →</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;