import Parser from "rss-parser";
import { geminiProcessor } from "../utils/gemini.js";

const parser = new Parser();

export const fetchIndustryNews = async (req, res) => {
  try {
    const industryName = req.body.industry;
    const searchQuery = `${industryName} jobs OR hiring OR recruitment OR layoffs OR employment OR careers India`;

    if (!industryName) {
      return res.status(400).json({ success: false, message: "Missing industry name" });
    }

    const googleNewsRSS = `https://news.google.com/rss/search?q=${encodeURIComponent(searchQuery)}&hl=en-IN&gl=IN&ceid=IN:en`;
    const feed = await parser.parseURL(googleNewsRSS);
    const newsTitles = feed.items.slice(0, 10).map((article) => article.title);

    const prompt = `Analyze these recent news headlines about the ${industryName} industry and provide a concise 2-3 sentence summary of the current job industry trends and outlook:\n${newsTitles.join('\n')}`;

    const summary = await geminiProcessor(prompt);

    res.json({ success: true, summary });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ success: false, message: "Failed to fetch news" });
  }
};
