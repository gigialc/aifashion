"use client"
import React, { useState } from 'react';

const ChicChat = () => {
  const [pinterestLink, setPinterestLink] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSuggestions([
      { id: 1, name: 'Eco-friendly T-shirt', price: 29.99, image: '/api/placeholder/300/400' },
      { id: 2, name: 'Recycled Jeans', price: 79.99, image: '/api/placeholder/300/400' },
      { id: 3, name: 'Organic Cotton Dress', price: 89.99, image: '/api/placeholder/300/400' },
    ]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] to-[#E6E6FA] p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-extrabold text-center mb-2 text-[#8A2BE2] tracking-tight">ChicChat</h1>
        <p className="text-center mb-12 text-[#4B0082] text-xl">Discover your sustainable style</p>
        
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl overflow-hidden mb-12 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="pinterest-link" className="block text-sm font-medium text-[#4B0082]">Pinterest Board URL</label>
              <input
                id="pinterest-link"
                type="url"
                placeholder="https://pinterest.com/yourboard"
                value={pinterestLink}
                onChange={(e) => setPinterestLink(e.target.value)}
                className="w-full rounded-full border-2 border-[#E6E6FA] focus:border-[#8A2BE2] focus:outline-none px-4 py-2"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#4B0082]">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#9370DB] to-[#8A2BE2] hover:from-[#8A2BE2] hover:to-[#9370DB] text-white rounded-full py-3 px-4 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing your style...
                </>
              ) : (
                <>
                  {/* <svg className="inline-block mr-2 h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg> */}
                  Find My Style
                </>
              )}
            </button>
          </form>
        </div>

        {suggestions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {suggestions.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="relative">
                  <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
                  <div className="absolute top-0 right-0 bg-[#8A2BE2] text-white px-3 py-1 rounded-bl-lg">
                    <svg className="inline-block h-4 w-4 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {item.price.toFixed(2)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-[#4B0082]">{item.name}</h3>
                  <p className="text-sm text-[#9370DB]">Sustainable Choice</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChicChat;