import VkBot from "../VK";
import TgBot from "../Telegram";
import { vkTypes, tgCommands } from "../Shared/types";
import { catchErrors, handleError } from "../Shared/errorHandlers";

import {
  onNewWallPostComment,
  onNewMessage,
  onNewPhotoComment,
  onBoardPostNew,
} from "../VK/handlers";

import {
  whoAmI,
  addUser,
  showGroups,
  addGroup,
  deleteAll,
} from "../Telegram/handlers";

export const vkBot = async ({ body }, res) => {
  const [err, bot] = await catchErrors(
    VkBot({
      body,
      res,
    }),
  );
  if (err) {
    handleError("Произошла одна или несколько ошибок. Лол", err);
    return;
  }
  bot.handle(vkTypes.message)(onNewMessage);
  bot.handle(vkTypes.wallReplyNew)(onNewWallPostComment);
  bot.handle(vkTypes.photoCommentNew)(onNewPhotoComment);
  bot.handle(vkTypes.boardPostNew)(onBoardPostNew);
};

export const tgBot = ({ body }, res) => {
  const bot = TgBot({ body }, res);
  bot.handle(tgCommands.start)(addUser);
  bot.handle(tgCommands.whoAmI)(whoAmI);
  bot.handle(tgCommands.showGroups)(showGroups);
  bot.handle(tgCommands.addGroup)(addGroup);
  bot.handle(tgCommands.deleteAll)(deleteAll);
};
