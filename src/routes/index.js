import { Router } from "express";

import { vkBot, tgBot } from "../controllers/botsController";

const router = Router();

router.post("/vkbot", vkBot);

router.post("/tgbot", tgBot);

export default router;
