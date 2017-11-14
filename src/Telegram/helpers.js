import moment from "moment";
import axios from "axios";

import { tgTypes } from "../Shared/types";

export const initTelegram = async () => {
    const { data } = await axios.post(
        `https://api.telegram.org/bot${process.env.TG_TOKEN}/${tgTypes.setWebhook}`,
        {
            url: `${process.argv[2]}/${process.env.TG_TOKEN}`,
        },
    );

    return data.description;
};
export const setExpireDate = (quantity, type = "minutes") =>
  moment().add(quantity, type);
