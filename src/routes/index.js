import { Router } from "express";

import { vkBot, tgBot } from "../controllers/botsController";

const router = Router();

router.post("/vkbot", vkBot);

router.post(`/${process.env.TG_TOKEN}`, tgBot);

export default router;
