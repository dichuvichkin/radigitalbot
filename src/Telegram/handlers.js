import Group from "../models/Group";
import User from "../models/User";

import { sendMessage } from "../Shared/helpers";

import { getUserId } from "./helpers";

export const addUser = async ({ message }) => {
  await User.sync({ force: true });
  const res = await User.create({
    UserId: message.from.id,
    Login: message.from.username,
  });
  console.log(res);
};

export const whoAmI = async () => {
  const res = await User.findAll({
    include: [Group],
  });

  console.log(
    res[0].get({
      plain: true,
    }),
  );
};

export const addGroup = async ({ message }) => {
  const UserId = message.from.id;

  const [GroupId, Answer] = [
    message.text
      .trim()
      .split(" ")
      .slice(1)
      .map(el => el.trim())
      .filter(el => Number(el))[0],
    message.text
      .trim()
      .split(" ")
      .slice(1)
      .map(el => el.trim())
      .filter(el => !Number(el))[0],
  ];
  await Group.sync();
  const createRes = await Group.findOrCreate({
    where: {
      userId: await getUserId(UserId),
      GroupId,
    },
    defaults: { Answer },
  });
  if (createRes[1]) {
    sendMessage("Группа успешно добавлена", UserId);
  } else {
    sendMessage("Такая группа уже существует", UserId);
  }
};
export const showGroups = async ({ message }) => {
  const UserId = message.from.id;

  const groups = await Group.findAll({
    where: { userId: await getUserId(UserId) },
    attributes: ["GroupId", "Answer"],
  })
    .map(group => group.get({ plain: true }))
    .map(el => ` Id группы: ${el.GroupId}, ответ: ${el.Answer}`);
  const text = `Ваши группы: ${groups}`;
  if (!groups.length) {
    sendMessage("Пусто! Как у студента в холодосе", UserId);
    return;
  }
  sendMessage(text, UserId);
};

export const deleteAll = async ({ message }) => {
  const UserId = message.from.id;

  const deletedQuontity = await Group.destroy({
    where: {
      userId: await getUserId(UserId),
    },
  });
  if (!deletedQuontity) {
    sendMessage(`Нечего удалять, бро`, UserId);
    return;
  }

  sendMessage("Все группы удалены", UserId);
};
