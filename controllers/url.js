import { nanoid } from "nanoid";
import Url from "../models/url.js";

export async function handleCreateurl(req, res) {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is requied" });
    const shortId = nanoid(8);
    await Url.create({
      shortId: shortId,
      redirectUrl: body.url,
      visitHistory: [],
      createdBy: req.user._id,
    });
    res.status(201).render("home", {
      id: shortId,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });
    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    return res.status(200).json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function handleRedirectUrl(req, res) {
  try {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );
    if (!entry) return res.status(404).json({ error: "Short URL not found" });
    return res.redirect(entry.redirectUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
