import moment from "moment";
import Group from "../models/Group";
import User from "../models/User";
import Promo from "../models/Promo";

import { sendMessage, formatDate } from "../Shared/helpers";

import { getUserId, setExpireDate, isAccountPaid } from "./helpers";

export const addUser = async ({ message }) => {
  await User.sync({ force: true });
  const res = await User.create({
    UserId: message.from.id,
    Login: message.from.username,
  });
  console.log(
    res.get({
      plain: true,
    }),
  );
};

export const whoAmI = async () => {
  const res = await User.findAll({
    include: [Group, Promo],
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
    await sendMessage("Группа успешно добавлена", UserId);
  } else {
    await sendMessage("Такая группа уже существует", UserId);
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
    await sendMessage("Пусто! Как у студента в холодосе", UserId);
    return;
  }
  await sendMessage(text, UserId);
};

export const deleteAll = async ({ message }) => {
  const UserId = message.from.id;

  const deletedQuontity = await Group.destroy({
    where: {
      userId: await getUserId(UserId),
    },
  });
  if (!deletedQuontity) {
    await sendMessage(`Нечего удалять, бро`, UserId);
    return;
  }

  await sendMessage("Все группы удалены", UserId);
};

export const promo = async ({ message }) => {
  const UserId = message.from.id;

  const promoCode = message.text
    .split(" ")
    .slice(1)
    .find(el => el === process.env.PROMO);

  if (!promoCode) {
    return;
  }

  await Promo.sync();
  const promoRes = await Promo.findOrCreate({
    where: { userId: await getUserId(UserId), code: promoCode },
  });

  if (promoRes[1]) {
    const date = setExpireDate(20);
    await User.update(
      {
        payExpiresDay: date,
      },
      {
        where: {
          UserId,
        },
      },
    );
    await sendMessage(`Ваш аккаунт активен до ${formatDate(date)}`, UserId);
    return;
  }

  const rawUserTime = await User.find({
    where: { UserId },
    attributes: ["payExpiresDay"],
  });

  const { payExpiresDay } = rawUserTime.get({
    plain: true,
  });

  const expiredDate = formatDate(payExpiresDay);

  const isElapsed = moment(payExpiresDay).diff(moment()) < 0;
  const text = isElapsed
    ? "Срок его действия истек"
    : `Срок действия истекает ${expiredDate}`;

  await sendMessage(`Промокод уже активирован. ${text}`, UserId);
};

export const status = async ({ message }) => {
  const UserId = message.from.id;

  const hasPaid = await isAccountPaid(UserId);

  if (!hasPaid) {
    await sendMessage("Аккаунт не оплачен");
    return;
  }

  const userData = await User.find({
    where: { UserId },
    attributes: ["payExpiresDay"],
  });

  const { payExpiresDay } = userData.get({
    plain: true,
  });

  const expiredDate = formatDate(payExpiresDay);
  await sendMessage(
    `Срок оплаты вашего аккаунта завершается ${expiredDate}`,
    UserId,
  );
};
