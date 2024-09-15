import { query, mutation } from './_generated/server';
import { v } from "convex/values";

export const getMatchedItems = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("items").collect();
    return items;
  },
});

export const updateMatchedItems = mutation({
  args: { characteristics: v.array(v.string()) },
  handler: async (ctx, { characteristics = [] }) => {
    // Fetch all items from the database
    const items = await ctx.db.query("items").collect();
    
    // Calculate matching score for each item
    const scoredItems = items.map(item => {
      const score = characteristics.reduce((acc, char) => {
        return acc + (item.characteristics.includes(char) ? 1 : 0);
      }, 0);
      return { ...item, score };
    });

    // Sort items by score in descending order
    scoredItems.sort((a, b) => b.score - a.score);

    // Update the top 10 matched items with their new scores
    const topItems = scoredItems.slice(0, 10);
    for (const item of topItems) {
      await ctx.db.patch(item._id, { matchScore: item.score });
    }

    return topItems;
  },
});
