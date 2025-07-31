import express from "express";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

const router = express.Router();

router.get("/transcript", async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).json({ error: "Missing YouTube URL" });
  }

  try {
    const loader = YoutubeLoader.createFromUrl(videoUrl, {
      language: "en",
      addVideoInfo: true,
    });

    const docs = await loader.load();

    res.json(docs); 
  } catch (error) {
    console.error("Transcript loading failed:", error);
    res.status(500).json({ error: "Failed to load transcript" });
  }
});

export default router;
