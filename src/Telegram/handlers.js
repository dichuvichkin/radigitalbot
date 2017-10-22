import moment from "moment";
import { Group, Promo, User, AdminPromo } from "../models";

import { sendMessage, formatDate, isAccountPaid } from "../Shared/helpers";

import { getUserId, setExpireDate } from "./helpers";

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
  const [group, isNew] = await Group.findOrCreate({
    where: { GroupId },
    attributes: ["id"],
    defaults: { Answer, userId: await getUserId(UserId) },
  });

  const user = await User.findOne({
    where: { UserId },
  });

  const groupId = group.get("id");
  const userId = user.get("id");

  if (isNew) {
    await group.addUser(userId);
    await sendMessage("Группа успешно добавлена", UserId);
    return;
  }

  const isLinkedToUser = await user.hasGroups(groupId);

  if (isLinkedToUser) {
    await sendMessage("Такая группа уже существует", UserId);
    return;
  }

  await user.addGroups(groupId);
  await group.addUser(userId);
  await sendMessage("Группа успешно добавлена", UserId);
};

export const showGroups = async ({ message }) => {
  const UserId = message.from.id;

  const user = await User.findOne({
    where: { UserId },
  });
  const groups = await user
    .getGroups({
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

export const deleteGroup = async ({ message }) => {
  const UserId = message.from.id;
  const GroupId = Number(message.text.split(" ").slice(1));
  const group = await Group.findOne({
    where: { GroupId },
  });
  if (!group) {
    await sendMessage("Такой группы не было", UserId);
    return;
  }
  const groupId = group.get("id");
  const user = await User.findOne({
    where: { UserId },
  });
  await user.removeGroups(groupId);
  await sendMessage("Группа удалена", UserId);
};

export const promo = async ({ message }) => {
  const UserId = message.from.id;
  await AdminPromo.sync();
  const promoCode = message.text
    .split(" ")
    .map(el => el.trim())
    .filter(el => el)
    .slice(1)[0];

  const isPromoCode = await AdminPromo.find({
    where: {
      code: promoCode,
    },
  });

  if (!isPromoCode) {
    await sendMessage(
      "Данного промокода не существует, либо срок его действия истек.",
      UserId,
    );
    return;
  }

  const userId = await getUserId(UserId);

  await Promo.sync();
  const [promoModel, isCreated] = await Promo.findOrCreate({
    where: { userId, code: promoCode },
  });

  if (isCreated) {
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
    await promoModel.addUser(userId);
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
    await sendMessage("Аккаунт не оплачен", UserId);
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
