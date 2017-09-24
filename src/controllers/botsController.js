import Bot from "../VK";
import { vkTypes } from "../Shared/types";

import {
  onNewWallPostComment,
  onNewMessage,
  onNewPhotoComment,
  onBoardPostNew
} from "../VK/handlers";

export const vkBot = ({ body }, res) => {
  const bot = Bot({
    body,
    res,
  });
  bot.handle(vkTypes.message)(onNewMessage);
  bot.handle(vkTypes.wallReplyNew)(onNewWallPostComment);
  bot.handle(vkTypes.photoCommentNew)(onNewPhotoComment);
  bot.handle(vkTypes.boardPostNew)(onBoardPostNew);
};

export const tgBot = (req, res) => {
  res.sendStatus(200);
};
