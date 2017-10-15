import axios from "axios";
import moment from "moment";

import { tgTypes } from "./types";
import { catchErrors, handleError } from "./errorHandlers";

export const postData = (token = "", id = "121754413") => type => async (
  data = {},
) => {
  const [err] = await catchErrors(
    axios.post(`https://api.telegram.org/bot${token}/${type}`, {
      chat_id: id,
      ...data,
    }),
  );
  if (err) {
    handleError(err);
  }
};

export const sendMessage = async (text, id) => {
  const post = postData(process.env.TG_TOKEN, id)(tgTypes.sendMessage);
  await post({
    parse_mode: tgTypes.HTML,
    text,
  });
};

export const formatDate = (date, format = "DD.MM.YYYY HH:mm") => {
  const momentDate = moment(date);
  return momentDate.isValid() ? momentDate.format(format) : null;
};
