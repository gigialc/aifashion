"use client"
import React, { useState } from 'react';
import { Search, Sparkles, Heart, HeartCrack } from 'lucide-react';

const priceRanges = [
  { min: 0, max: 50 },
  { min: 50, max: 100 },
  { min: 100, max: 250 },
  { min: 250, max: 350 },
];

const ChicChat = () => {
  const [pinterestLink, setPinterestLink] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);
  const [likes, setLikes] = useState({});

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
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-8 font-sans" style={{backgroundImage: "url('/chicai.png')"}}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl text-center mb-2 text-black tracking-tight font-serif leading-tight transform scale-105 transition-all duration-500 hover:text-gray-800">
          fashion
      </h1>
        <p className="text-center mb-8 text-gray-600 text-xl">your personal ai stylist</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center space-x-4">
            <div className="flex-grow relative">
              <label htmlFor="pinterest-link" className="block text-sm font-medium text-indigo-700 mb-2">
                Pinterest Board URL
              </label>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 group-hover:text-indigo-600 transition-colors duration-200" />
                <input
                  id="pinterest-link"
                  type="url"
                  placeholder="https://pinterest.com/yourboard"
                  value={pinterestLink}
                  onChange={(e) => setPinterestLink(e.target.value)}
                  className="w-full rounded-full bg-white border-2 border-purple-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-10 pr-4 py-2 text-indigo-900 placeholder-indigo-300 transition-all duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <div className="flex-shrink-0">
            <button 
              type="submit" 
              disabled={loading}
              className=" bg-gray-200 hover:from-indigo-700 hover:to-purple-700 text-black rounded-full py-2 px-5 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-50 whitespace-nowrap flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2" size={18} />
                  Discover
                </>
              )}
            </button>
            </div>
          </div>
          
          <div>
            {/* <label className="block text-sm font-medium text-indigo-700 mb-3">Price Range</label> */}
            <div className="flex flex-wrap gap-2 justify-left mb-10">
              {priceRanges.map((range, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedRange(index)}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
                    selectedRange === index
                      ? 'bg-black text-white shadow-md'
                      : 'bg-white text-purple-700 border border-purple-400 hover:border-indigo-400 hover:bg-pink'
                  }`}
                >
                  ${range.min} - ${range.max}
                </button>
              ))}
            </div>
          </div>
        </form>
        </div>

        {suggestions.length > 0 && (
        <div className="max-w-4xl mx-auto mt-8 rounded-3xl p-8">
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
                  <p className="text-sm text-[#9370DB] mb-4">Sustainable Choice</p>
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => handleLike(item.id, true)}
                      className={`p-2 rounded-full transition-colors duration-200 ${likes[item.id] === true ? 'bg-pink-100 text-pink-500' : 'hover:bg-pink-50 text-gray-400'}`}
                    >
                      <Heart size={24} fill={likes[item.id] === true ? 'currentColor' : 'none'} />
                    </button>
                    <button 
                      onClick={() => handleLike(item.id, false)}
                      className={`p-2 rounded-full transition-colors duration-200 ${likes[item.id] === false ? 'bg-gray-100 text-gray-500' : 'hover:bg-gray-50 text-gray-400'}`}
                    >
                      <HeartCrack size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChicChat;