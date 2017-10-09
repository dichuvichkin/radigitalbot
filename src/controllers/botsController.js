import VkBot from "../VK";
import TgBot from "../Telegram";
import { vkTypes, tgCommands } from "../Shared/types";

import {
  onNewWallPostComment,
  onNewMessage,
  onNewPhotoComment,
  onBoardPostNew,
} from "../VK/handlers";

import { whoAmI, addUser } from "../Telegram/handlers";

export const vkBot = ({ body }, res) => {
  const bot = VkBot({
    body,
    res,
  });
  bot.handle(vkTypes.message)(onNewMessage);
  bot.handle(vkTypes.wallReplyNew)(onNewWallPostComment);
  bot.handle(vkTypes.photoCommentNew)(onNewPhotoComment);
  bot.handle(vkTypes.boardPostNew)(onBoardPostNew);
};

export const tgBot = ({ body }, res) => {
  const bot = TgBot({ body }, res);
  bot.handle(tgCommands.start)(addUser);
  bot.handle(tgCommands.whoAmI)(whoAmI);
};
