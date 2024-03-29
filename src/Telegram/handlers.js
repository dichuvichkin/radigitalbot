// @flow

import moment from "moment";
import { Group, Promo, User, AdminPromo } from "../models";

import {
  sendMessage,
  sendMessages,
  formatDate,
  hasAccountPaid
} from "../Shared/helpers";

import { setExpireDate } from "./helpers";

type Body = {
  UserId: number,
  GroupId?: number,
  Login?: string,
  Answer?: string,
  PromoCode?: string
}

export const addUser = async ({ UserId, Login }: Body) => {
  await User.sync({ force: true });
  await User.create({
    UserId,
    Login
  });
};

export const whoAmI = async ({ UserId }: Body) => {
  const res = await User.findOne({
    include: [Group, Promo]
  });

  const message = res.get({
    plain: true
  });
  await sendMessages(message, [UserId]);
};

export const addGroup = async ({ UserId, GroupId, Answer }: Body) => {
  await Group.sync();
  const [group] = await Group.findOrCreate({
    where: { GroupId },
    attributes: ["id"],
    defaults: { Answer }
  });

  const user = await User.findOne({
    where: { UserId }
  });

  const groupId: number = group.get("id");
  const userId: number = user.get("id");

  const hasUserHaveGroup: boolean = await user.hasGroup(groupId);

  if (hasUserHaveGroup) {
    await sendMessage("Такая группа уже существует", UserId);
    return;
  }

  await Promise.all([user.addGroups(groupId), group.addUser(userId)]);
  await sendMessage("Группа успешно добавлена", UserId);
};

export const showGroups = async ({ UserId }: Body) => {
  const user = await User.findOne({
    where: { UserId }
  });
  const groups: string = await user
    .getGroups({
      attributes: ["GroupId", "Answer"]
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

export const deleteGroup = async ({ UserId, GroupId }: Body) => {
  const group = await Group.findOne({
    where: { GroupId }
  });
  if (!group) {
    await sendMessage("Такой группы не было", UserId);
    return;
  }
  const groupId: number = group.get("id");
  const user = await User.findOne({
    where: { UserId }
  });
  await user.removeGroups(groupId);
  await sendMessage("Группа удалена", UserId);
};

export const promo = async ({ UserId, PromoCode }: Body) => {
  await AdminPromo.sync();
  const isPromoCode = await AdminPromo.findOne({
    where: {
      code: PromoCode
    }
  });

  if (!isPromoCode) {
    await sendMessage(
      "Данного промокода не существует, либо срок его действия истек.",
      UserId
    );
    return;
  }

  const user = await User.findOne({
    where: { UserId }
  });

  await Promo.sync();
  const [promoModel, isCreated] = await Promo.findOrCreate({
    where: { code: PromoCode }
  });

  const userId = user.get("id");
  const promoId = promoModel.get("id");

  const hasUserHavePromo = await user.hasPromo(promoId);

  const isNew = isCreated || !hasUserHavePromo;

  if (isNew) {
    const date = setExpireDate(20);
    await Promise.all([
      User.update(
        {
          payExpiresDay: date
        },
        {
          where: {
            UserId
          }
        }
      ),
      user.addPromo(promoId),
      promoModel.addUser(userId)
    ]);
    await sendMessage(`Ваш аккаунт активен до ${formatDate(date)}`, UserId);
  }

  const payExpiresDay = user.get("payExpiresDay");

  const expiredDate = formatDate(payExpiresDay);

  const isElapsed = moment(payExpiresDay).diff(moment()) < 0;
  const text = isElapsed
    ? "Срок его действия истек"
    : `Срок действия истекает ${expiredDate}`;

  await sendMessage(`Промокод уже активирован. ${text}`, UserId);
};

export const status = async ({ UserId }: Body) => {
  const hasPaid = await hasAccountPaid(UserId);

  if (!hasPaid) {
    await sendMessage("Аккаунт не оплачен", UserId);
    return;
  }

  const payExpiresDay = await User.findOne({
    where: { UserId },
    attributes: ["payExpiresDay"]
  }).get("payExpiresDay");

  const expiredDate: string = formatDate(payExpiresDay);

  await sendMessage(
    `Срок оплаты вашего аккаунта завершается ${expiredDate}`,
    UserId
  );
};
