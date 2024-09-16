"use client";
import React, { useState, useEffect } from "react";
import { Search, Sparkles, Heart, HeartCrack, Link as LinkIcon } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api"; // Make sure the path is correct for your project setup

const ChicChat = () => {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");
  const updateMatchedItems = useMutation(api.items.updateMatchedItems);  // Mutation to update items
  const getMatchedItems = useQuery(api.items.getMatchedItems);  // Query to get matched items
  const fetchMatchedItems = useQuery(api.items.getMatchedItems);  // Fetch matched items from Convex
  const mutateMatchedItems = useMutation(api.items.updateMatchedItems); // Mutation to update matched items in Convex
  const [matchedItems, setMatchedItems] = useState([]);
  const [items, setItems] = useState([]);

  const handleLinkChange = (value) => {
    setLink(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (link.trim() === "") {
      console.log("No valid link provided.");
      setLoading(false);
      return;
    }

    // const linksToPinImages = [
    //   "https://i.pinimg.com/564x/66/c5/2b/66c52bcb458b467fec50806ba466dbdf.jpg",
    //   "https://i.pinimg.com/736x/98/09/60/9809609693aea98c987ae6767a071b6f.jpg",
    //   "https://i.pinimg.com/564x/a1/bc/26/a1bc26115bf0dc9278a9ce7a36936278.jpg",
    //   "https://i.pinimg.com/736x/7a/2f/fb/7a2ffb71ede2705f27bfc0ea9643c8c0.jpg",
    //   "https://i.pinimg.com/564x/6c/5f/eb/6c5febe4049c4597d70b1cb286aa9cde.jpg"
    // ];

    try {
        const response = await fetch("https://proxy.tune.app/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TUNE_API_KEY}`, // Replace with your actual API key
          },
          body: JSON.stringify({
            temperature: 0.9,
            messages: [
              {
                role: "system",
                content: "You are TuneStudio",
              },
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `Imagine you are a stylist. Please identify only 1 characteristic that best describes the aesthetic if it were translated to an item of clothing from each of the 8 categories below. List the response with only the answers and each answer separated by a comma.

                    1. Color: Red, Blue, Green, Yellow, Pink, Black, White, Gray, Beige, Burgundy, Navy, Emerald, Teal, Lavender, Coral, Mint, Mustard, Pastel, Neon, Metallic
                    
                    2. Texture: Smooth, Rough, Silky, Suede, Velvet, Glossy, Matte, Satin, Corduroy, Wool, Denim, Crochet, Embossed, Quilted, Ribbed, Sequin, Pleated, Knit, Sheer, Faux fur
                    
                    3. Vibe: Casual, Formal, Bohemian, Edgy, Preppy, Vintage, Sporty, Minimalist, Glamorous, Retro, Streetwear, Grunge, Punk, Business, Resort, Cottagecore, Urban, Futuristic, Hippie, Avant-garde
                    
                    4. Shape: Boxy, Fitted, A-line, Bodycon, Oversized, Slim-fit, Cropped, Flared, Asymmetric, Tailored, Balloon, Draped, Peplum, Straight, Wrap, Trapeze, Mermaid, Pencil, Tiered, Shift
                    
                    5. Pattern: Stripes, Polka dots, Floral, Animal print, Geometric, Plaid, Houndstooth, Paisley, Tie-dye, Camouflage, Chevron, Gingham, Argyle, Ikat, Abstract, Damask, Pinstripe, Baroque, Ombre, Brocade
                    
                    6. Occasion: Wedding, Party, Cocktail, Casual outing, Workwear, Beachwear, Gym, Travel, Brunch, Evening, Festival, Formal event, Dinner date, Holiday, Graduation, Prom, Business meeting, Weekend, Red carpet, Baby shower
                    
                    7. Style Era: 1920s, 1930s, 1940s, 1950s, 1960s, 1970s, 1980s, 1990s, Y2K, Contemporary, Futuristic, Renaissance, Victorian, Gothic, Regency, Mid-century, Retro-futurism, Disco, New Wave
                    
                    8. Season: Spring, Summer, Fall, Winter, Transitional, Resort, Holiday, Pre-fall, Cruise, Festival season, Monsoon, Spring/summer, Fall/winter, Back-to-school, Ski season, Beach season, Autumnal, Rainy season, New Year's Eve, Valentine's Day`,
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: link, // Using the current Pinterest image
                    },
                  },
                ],
              },
            ],
            model: "rohan/tune-gpt-4o",
            stream: false,
            frequency_penalty: 0.2,
            max_tokens: 1000,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error("API Response Error:", error);
          alert(`Error: ${error.error.message}`);
          throw new Error(`API error: ${error.error.message}`);
        }

        const result = await response.json();
        console.log("API Response for Image:", result);

        // Parse characteristics from the API response
        const characteristics = result.choices[0].message.content
          .split(",")
          .map((item) => item.trim());

        console.log("Parsed Characteristics:", characteristics);

        if (characteristics.length === 0) {
          console.error("Characteristics are empty.");
          throw new Error("Failed to extract characteristics from the API response.");
        }

        // Update the matched items in the Convex database
        await updateMatchedItems({ characteristics });

        // Fetch the updated matched items from Convex
        const updatedItems = await updateMatchedItems({ characteristics });
        console.log("Updated Items from Backend:", updatedItems);  // Add this to see the result

        // Set the updated matched items
        setMatchedItems(updatedItems);
      
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      alert(`An error occurred: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-8 font-sans mb-20"
      style={{ backgroundImage: "url('/hackmnit.jpg')" }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl text-center mb-2 text-black tracking-tight font-serif leading-tight transform scale-105 transition-all duration-500 hover:text-gray-800">
          MyAIStylist
        </h1>
        <p className="text-center mb-8 text-gray-600 text-xl">your personal ai stylist</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full">
              <label htmlFor="link-input" className="block text-sm font-medium text-indigo-700 mb-2">
                Paste image link
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
              disabled={loading || link.trim() === ""}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-2 px-5 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
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

      {matchedItems && matchedItems.length > 0 && (
        <div className="max-w-4xl mx-auto mt-8 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {matchedItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-[#4B0082]">{item.title}</h3>
                  <p className="text-sm text-[#9370DB] mb-4">{item.source}</p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Item
                  </a>
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

