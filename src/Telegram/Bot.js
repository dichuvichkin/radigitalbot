import axios from "axios";

import { tgTypes } from "../Shared/types";

const Bot = ({ body }, res) => {
  res.sendStatus(200);
  return {
    handle: type => callback => {
      const message = body.message || body.edited_message;
      const command = message.text.split(" ")[0];
      if (command !== type) {
        return;
      }
      callback({
        message
      });
    },
  };
};

export const initTelegram = () => {
  axios
    .post(
      `https://api.telegram.org/bot${process.env
        .TG_TOKEN}/${tgTypes.setWebhook}`,
      {
        url: `${process.argv[2]}/tgbot`,
      },
    )
    .then(({ data }) => {
      console.log(data.description);
    })
    .catch(error => {
      console.log(error);
    });
};

export default Bot;
