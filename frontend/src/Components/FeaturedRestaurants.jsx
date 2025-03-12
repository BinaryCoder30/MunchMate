import React from 'react';

const FeaturedRestaurants = ({ filters }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-[#2C3E50]">Featured Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            name: 'Punjab Grill',
            cuisine: 'Punjabi',
            image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3'
          },
          {
            name: 'Dragon House',
            cuisine: 'Chinese',
            image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-4.0.3'
          },
          {
            name: 'La Piazza',
            cuisine: 'Italian',
            image: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixlib=rb-4.0.3'
          },
          {
            name: 'Sushi Ko',
            cuisine: 'Japanese',
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3'
          }
        ].map((restaurant) => (
          <div key={restaurant.name} className="relative rounded-lg overflow-hidden h-64 group cursor-pointer">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">{restaurant.name}</h3>
              <p className="text-sm">{restaurant.cuisine} Cuisine</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRestaurants;