import axios from "axios";

import { tgTypes } from "../Bot";
import { postData } from "../Shared/helpers";

const tgToken = "381181871:AAHNhEyIUfK3MIrA9eS9aJmbQ0YaRUTTONs";

export const sendMessage = text =>
  postData(tgToken, "121754413")(tgTypes.sendMessage)({
    parse_mode: tgTypes.HTML,
    text,
  });

export const getData = ({ v = "5.8", vkMethod, ...rest }) =>
  axios
    .get(`https://api.vk.com/method/${vkMethod}`, {
      params: {
        v,
        ...rest,
      },
    })
    .then(({ data }) => data)
    .catch(({ response }) => console.error(response));
