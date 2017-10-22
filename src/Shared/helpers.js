import axios from "axios";
import moment from "moment";

import { User } from "../models";

import { tgTypes } from "./types";
import { catchErrors, handleError } from "./errorHandlers";

export const postData = (token = "", ids) => type => async (data = {}) => {
  if (typeof ids === "object") {
    const ajaxes = ids.map(id =>
      axios.post(`https://api.telegram.org/bot${token}/${type}`, {
        chat_id: id,
        ...data,
      }),
    );
    const resArr = await Promise.all(ajaxes);
    resArr.forEach(res => {
      const { data: { ok, result } } = res;
      if (!ok) {
        handleError(result);
      }
    });
  } else {
    const [err] = await catchErrors(
      axios.post(`https://api.telegram.org/bot${token}/${type}`, {
        chat_id: ids,
        ...data,
      }),
    );
    if (err) {
      handleError(err);
    }
  }
};

export const sendMessage = async (text, ids = []) => {
  const post = postData(process.env.TG_TOKEN, ids)(tgTypes.sendMessage);
  await post({
    parse_mode: tgTypes.HTML,
    text,
  });
};

export const formatDate = (date, format = "DD.MM.YYYY HH:mm") => {
  const momentDate = moment(date);
  return momentDate.isValid() ? momentDate.format(format) : null;
};

export const isAccountPaid = async UserId => {
  const userData = await User.find({
    where: { UserId },
    attributes: ["payExpiresDay"],
  });

  const { payExpiresDay } = userData.get({
    plain: true,
  });

  return moment(payExpiresDay).diff(moment()) > 0;
};
