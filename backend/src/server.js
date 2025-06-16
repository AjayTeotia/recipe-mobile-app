import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";

const app = express();

const PORT = ENV.PORT || 5001;

// * Middleware to parse JSON request bodies
app.use(express.json());

// * HEALTH CHECK FOR API ENDPOINT IS WORKING OR NOT
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

// * CREATE/ADD A FAVORITE RECIPE ENDPOINT
app.post("/api/favorites", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;
    if (!userId || !recipeId || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFavorite = await db
      .insert(favoritesTable)
      .values({
        userId,
        recipeId,
        title,
        image,
        cookTime,
        servings,
      })
      .returning();

    res.status(201).json(newFavorite[0]);
  } catch (error) {
    console.log("ERROR ADDING FAVORITE RECIPE", error);
    res.status(500).json({ error: "Something went wrong" });

    console.error("Failed to add favorite recipe:", error.message);

  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
