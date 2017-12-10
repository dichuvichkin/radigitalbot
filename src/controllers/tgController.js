// @flow

import axios from "axios";

import {
  addUser,
  whoAmI,
  showGroups,
  status,
  addGroup,
  deleteGroup,
  promo,
} from "../Telegram/handlers";
import { tgCommands } from "../Shared/types";

type VkBody = {
    body: {
      ["message" | "edited_message"]: {
            text: string,
            from: {
                id: number,
                username: string
            }
        }
    }
}

const internalReq = axios.create({
  baseURL: `http://localhost:${process.env.PORT || ""}`,
});

export const init = async ({ body }: VkBody, res: Object) => {
  const { text } = body.message || body.edited_message;
  const command: string | typeof undefined = text
    .split(" ")
    .map(el => el.trim())
    .filter(el => el)
    .find(str => str.startsWith("/"));

  const isCommandExists: boolean = Object.keys(tgCommands)
    .map(key => tgCommands[key])
    .includes(command);

  if (!command || !isCommandExists) {
    res.sendStatus(200);
    return;
  }
  await internalReq.post(`/${process.env.TG_TOKEN || ""}${command}`, {
    ...body,
  });
  res.sendStatus(200);
};

export const addUserController = async ({ body }: VkBody, res: Object) => {
  const { id, username } = body.message.from;
  await addUser({
    UserId: id,
    Login: username,
  });
  res.sendStatus(200);
};

export const whoAmIController = async ({ body }: VkBody, res: Object) => {
  const UserId = body.message.from.id;
  await whoAmI({ UserId });
  res.sendStatus(200);
};

export const showGroupsController = async ({ body }: VkBody, res: Object) => {
  await showGroups({
    UserId: body.message.from.id,
  });
  res.sendStatus(200);
};

export const statusController = async ({ body }: VkBody, res: Object) => {
  await status({ UserId: body.message.from.id });
  res.sendStatus(200);
};

export const addGroupController = async ({ body }: VkBody, res: Object) => {
  const [GroupId, Answer]: [number, string] = [
    body.message.text
      .trim()
      .split(" ")
      .slice(1)
      .filter(el => el && Number(el))
      .map(el => Number(el))[0],
    body.message.text
      .trim()
      .split(" ")
      .slice(1)
      .filter(el => el && !Number(el))[0],
  ];

  await addGroup({
    UserId: body.message.from.id,
    GroupId,
    Answer,
  });
  res.sendStatus(200);
};

export const deleteGroupController = async ({ body }: VkBody, res: Object) => {
  const UserId = body.message.from.id;
  const GroupId = Number(body.message.text.split(" ").slice(1));
  await deleteGroup({
    UserId,
    GroupId,
  });
  res.sendStatus(200);
};

export const promoController = async ({ body }: VkBody, res: Object) => {
  const UserId = body.message.from.id;

  const PromoCode = body.message.text
    .split(" ")
    .map(el => el.trim())
    .filter(el => el)
    .slice(1)[0];

  await promo({
    UserId,
    PromoCode,
  });
  res.sendStatus(200);
};
