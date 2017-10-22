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
  deleteGroup,
  promo,
  status,
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
  if (!bot) {
    return;
  }
  await bot.handle(vkTypes.message)(onNewMessage);
  await bot.handle(vkTypes.wallReplyNew)(onNewWallPostComment);
  await bot.handle(vkTypes.photoCommentNew)(onNewPhotoComment);
  await bot.handle(vkTypes.boardPostNew)(onBoardPostNew);
};

export const tgBot = async ({ body }, res) => {
  const bot = TgBot({ body }, res);
  await bot.handle(tgCommands.whoAmI)(whoAmI);
  await bot.handle(tgCommands.start)(addUser);
  await bot.handle(tgCommands.showGroups)(showGroups);
  await bot.handle(tgCommands.addGroup)(addGroup);
  await bot.handle(tgCommands.deleteGroup)(deleteGroup);
  await bot.handle(tgCommands.promo)(promo);
  await bot.handle(tgCommands.status)(status);
};
