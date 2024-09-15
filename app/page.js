"use client"
import React, { useState } from 'react';
import { Search, Sparkles, Heart, HeartCrack, Link as LinkIcon } from 'lucide-react';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

const ChicChat = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [likes, setLikes] = useState({});
  const [link, setLink] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleLinkChange = (value) => {
    setLink(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (link.trim() === '') {
      console.log('No valid link provided.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://proxy.tune.app/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "sk-tune-qw1eeqoeEQ6CmbgPLr29JckQQbFVwwTahxH", // Replace with your actual API key
        },
        body: JSON.stringify({
          images: [link],
          temperature: 0.9,
          messages: [
            {
              role: "system",
              content: "You are TuneStudio"
            },
            {
              role: "user",
              content: `Please identify 2 characteristics from each of the 8 categories below that the picture can best be described by. List the response with only the answers separated by commas.

              1. Color
              Red, Blue, Green, Yellow, Pink, Black, White, Gray, Beige, Burgundy, Navy, Emerald, Teal, Lavender, Coral, Mint, Mustard, Pastel, Neon, Metallic
              
              2. Texture
              Smooth, Rough, Silky, Suede, Velvet, Glossy, Matte, Satin, Corduroy, Wool, Denim, Crochet, Embossed, Quilted, Ribbed, Sequin, Pleated, Knit, Sheer, Faux fur
              
              3. Vibe
              Casual, Formal, Bohemian, Edgy, Preppy, Vintage, Sporty, Minimalist, Glamorous, Retro, Streetwear, Grunge, Punk, Business, Resort, Cottagecore, Urban, Futuristic, Hippie, Avant-garde
              
              4. Shape
              Boxy, Fitted, A-line, Bodycon, Oversized, Slim-fit, Cropped, Flared, Asymmetric, Tailored, Balloon, Draped, Peplum, Straight, Wrap, Trapeze, Mermaid, Pencil, Tiered, Shift
              
              5. Pattern
              Stripes, Polka dots, Floral, Animal print, Geometric, Plaid, Houndstooth, Paisley, Tie-dye, Camouflage, Chevron, Gingham, Argyle, Ikat, Abstract, Damask, Pinstripe, Baroque, Ombre, Brocade
              
              6. Occasion
              Wedding, Party, Cocktail, Casual outing, Workwear, Beachwear, Gym, Travel, Brunch, Evening, Festival, Formal event, Dinner date, Holiday, Graduation, Prom, Business meeting, Weekend, Red carpet, Baby shower
              
              7. Style Era
              1920s, 1930s, 1940s, 1950s, 1960s, 1970s, 1980s, 1990s, Y2K, Contemporary, Futuristic, Renaissance, Victorian, Gothic, Regency, Mid-century, Retro-futurism, Disco, New Wave
              
              8. Season
              Spring, Summer, Fall, Winter, Transitional, Resort, Holiday, Pre-fall, Cruise, Festival season, Monsoon, Spring/summer, Fall/winter, Back-to-school, Ski season, Beach season, Autumnal, Rainy season, New Year's Eve, Valentine's Day
              
              Here is the image link: ${link}`,
            },
          ],
          model: "rohan/tune-gpt-4o",
          stream: false,
          frequency_penalty: 0.2,
          max_tokens: 1000,
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("API Response Error:", error);
        alert(`Error: ${error.error.message}`);
        throw new Error(`API error: ${error.error.message}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      setResponseData(result);
      setSuggestions([
        { id: 1, name: 'Eco-friendly T-shirt', price: 29.99, image: '/api/placeholder/300/400' },
        { id: 2, name: 'Recycled Jeans', price: 79.99, image: '/api/placeholder/300/400' },
        { id: 3, name: 'Organic Cotton Dress', price: 89.99, image: '/api/placeholder/300/400' },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(`An error occurred: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-8 font-sans mb-20" style={{backgroundImage: "url('/hackmnit.jpg')"}}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl text-center mb-2 text-black tracking-tight font-serif leading-tight transform scale-105 transition-all duration-500 hover:text-gray-800">
          MITstyle
        </h1>
        <p className="text-center mb-8 text-gray-600 text-xl">your personal ai stylist</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full">
              <label htmlFor="link-input" className="block text-sm font-medium text-indigo-700 mb-2">
                Paste Pintrest link
              </label>
              <input
                id="link-input"
                type="url"
                value={link}
                onChange={(e) => handleLinkChange(e.target.value)}
                placeholder="Image link"
                className="w-full p-2 border border-indigo-300 rounded-lg mb-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading || link.trim() === ''}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-2 px-5 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <LinkIcon className="mr-2" size={18} />
                  Submit Link
                </>
              )}
            </button>
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
                  {/* <div className="absolute top-0 right-0 bg-[#8A2BE2] text-white px-3 py-1 rounded-bl-lg">
                    <svg className="inline-block h-4 w-4 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {item.price.toFixed(2)}
                  </div> */}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-[#4B0082]">{item.name}</h3>
                  <p className="text-sm text-[#9370DB] mb-4">Sustainable Choice</p>
                  {/* <div className="flex justify-between items-center">
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
                  </div> */}
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