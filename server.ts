import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in environment secrets.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Live Himalayan Travel Advisory & Grounded Search Route (gemini-4-hydrogen + googleSearch)
  app.post("/api/travel-advisory", async (req, res) => {
    try {
      const { query } = (req.body || {}) as { query?: string };
      const cleanQuery = typeof query === "string" ? query.trim() : "";

      if (!cleanQuery || cleanQuery.length > 300) {
        res.status(400).json({
          error: "Please provide a valid travel question (1 to 300 characters).",
        });
        return;
      }

      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: `You are an expert Eastern Himalayan travel desk advisor for Aadhya Gorkha Travels in Siliguri, West Bengal. Answer the traveler's question accurately with current, up-to-date information using Google Search grounding. Keep the answer concise, factual, practical, and structured in 3-4 short bullet points or brief sentences focused on permits, weather, road conditions, entry rules, or logistics.\n\nTraveler question: ${cleanQuery}`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const answer = (response.text || "").trim();
      const rawChunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      const seenUris = new Set<string>();
      const sources: Array<{ title: string; uri: string }> = [];

      for (const chunk of rawChunks) {
        const uri = chunk.web?.uri;
        const title = chunk.web?.title;
        if (uri && !seenUris.has(uri)) {
          seenUris.add(uri);
          sources.push({
            title: title || new URL(uri).hostname,
            uri,
          });
        }
      }

      if (!answer) {
        res.status(502).json({
          error: "No advisory information returned from search grounding. Please try again.",
        });
        return;
      }

      res.json({
        answer,
        sources: sources.slice(0, 5),
        updatedAt: new Date().toISOString(),
      });
    } catch (err: unknown) {
      console.error("Travel advisory error:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Unable to fetch live travel advisory at the moment.";
      res.status(500).json({ error: message });
    }
  });

  // Mount Vite middleware in dev or serve built SPA in production
  if (process.env.NODE_ENV === "production") {
    const distDir = path.resolve(__dirname, "dist");
    app.use(express.static(distDir));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Aadhya Gorkha Travels server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
