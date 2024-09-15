import { query, mutation } from './_generated/server';
import { v } from "convex/values";

export const getMatchedItems = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db
      .query("tasks") 
      .order("desc", "matchScore")
      .collect();
    return items;
  },
});

export const updateMatchedItems = mutation({
    args: { characteristics: v.array(v.string()) },
    handler: async (ctx, { characteristics = [] }) => {
      const items = await ctx.db.query("tasks").collect();
  
      // Parse characteristics field
      const formattedItems = items.map(item => {
        const itemCharacteristics = Array.isArray(item.characteristics)
          ? item.characteristics
          : (item.characteristics || "").split(",").map(char => char.trim());
  
        return {
          ...item,
          characteristics: itemCharacteristics
        };
      });
  
      // Calculate scores
      const scoredItems = formattedItems.map(item => {
        const score = characteristics.reduce((acc, char) => {
          return acc + (item.characteristics.includes(char) ? 1 : 0);
        }, 0);
  
        console.log("Matching Item Characteristics:", item.characteristics);
        console.log("Input Characteristics:", characteristics);
  
        return { ...item, score };
      });
  
      // Sort and update items
      scoredItems.sort((a, b) => b.score - a.score);
      const topItems = scoredItems.slice(0, 10);
      
      for (const item of topItems) {
        await ctx.db.patch(item._id, { matchScore: item.score });
      }
  
      return topItems;
    },
  });