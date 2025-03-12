import React from 'react';

const Collections = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            name: 'Must-Try This Week',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836'
          },
          {
            name: 'Hidden Gems',
            image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5'
          },
          {
            name: 'Date Night Spots',
            image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0'
          },
          {
            name: 'Luxury Dining',
            image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696'
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