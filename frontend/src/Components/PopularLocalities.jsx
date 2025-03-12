import React from 'react';

const PopularLocalities = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-[#2C3E50]">Popular Localities in Your City</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { area: 'Navrangpura', places: 285 },
          { area: 'Bodakdev', places: 310 },
          { area: 'Vastrapur', places: 265 },
          { area: 'Satellite', places: 295 },
          { area: 'CG Road', places: 245 },
          { area: 'SG Highway', places: 320 }
        ].map((locality) => (
          <div
            key={locality.area}
            className="bg-[#E0E0E0] rounded-lg p-6 flex justify-between items-center hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div>
              <h3 className="font-bold text-xl text-[#2C3E50]">{locality.area}</h3>
              <p className="text-[#606060]">{locality.places} places</p>
            </div>
            <span className="text-[#3498DB]">→</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularLocalities;