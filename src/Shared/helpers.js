// @flow

import axios from "axios";
import moment from "moment";

import { User } from "../models";

import { tgTypes } from "./types";

export const postData = ({
  token = "",
  id,
  type,
  data = {},
}: {
  token: any,
  id: number,
  type: string,
  data: Object,
}): Promise<void> =>
  axios.post(
    `https://api.telegram.org/bot${token}/${type}`,
    ({
      chat_id: id,
      ...data,
    }),
  );

export const sendMessage = (text: string, id: number): Promise<void> =>
  postData({
    token: process.env.TG_TOKEN,
    id,
    type: tgTypes.sendMessage,
    data: {
      parse_mode: tgTypes.HTML,
      text,
    },
  });

export const sendMessages = (
  text: string,
  ids: Array<number> = [],
): Promise<void[]> => Promise.all(ids.map(id => sendMessage(text, id)));

export const formatDate = (
  date: moment | string,
  format: string = "DD.MM.YYYY HH:mm",
): string => {
  const momentDate: moment = moment(date);
  return momentDate.isValid() ? momentDate.format(format) : "";
};

export const hasAccountPaid = async (UserId: number): Promise<boolean> => {
  const payExpiresDay: Promise<string> = await User.find({
    where: { UserId },
    attributes: ["payExpiresDay"],
  }).get("payExpiresDay");

  return moment(payExpiresDay).diff(moment()) > 0;
};
