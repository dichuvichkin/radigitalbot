import VkBot from "../VK";
import { vkTypes } from "../Shared/types";
import { catchErrors, handleError } from "../Shared/errorHandlers";

import {
  onWallReplyNew,
  onNewMessage,
  onNewPhotoComment,
  onBoardPostNew,
} from "../VK/handlers";

export default async ({ body }, res) => {
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
  await bot.handle(vkTypes.wallReplyNew)(onWallReplyNew);
  await bot.handle(vkTypes.photoCommentNew)(onNewPhotoComment);
  await bot.handle(vkTypes.boardPostNew)(onBoardPostNew);
};
