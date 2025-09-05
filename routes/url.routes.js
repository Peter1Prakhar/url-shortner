import express from "express";

const router = express.Router();

import { createShortUrl } from "../controllers/url.controller.js";

router.post("/shorten", createShortUrl);

export default router;