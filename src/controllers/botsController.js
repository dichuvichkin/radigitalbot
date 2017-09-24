import Bot, { vkTypes } from "../Bot";

import { onNewWallPostComment, onNewMessage } from "../VK/handlers";

export const vkBot = ({ body }, res) => {
  const bot = Bot({
    confirmString: "53cefcd8",
    body,
    res,
  });
  bot.handle(vkTypes.message)(onNewMessage);
  bot.handle(vkTypes.wallReplyNew)(onNewWallPostComment);
};

export const tgBot = (req, res) => {
  res.sendStatus(200);
};
