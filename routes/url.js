import { Router } from "express";
import {
  handleCreateurl,
  handleGetAnalytics,
  handleRedirectUrl,
} from "../controllers/url.js";

const router = Router();

router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/:shortId", handleRedirectUrl);
router.post("/", handleCreateurl);

export default router;
