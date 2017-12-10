// @flow

import moment from "moment";
import axios from "axios";

import { tgTypes } from "../Shared/types";

export const initTelegram = () =>
  axios
    .post(
      `https://api.telegram.org/bot${process.env.TG_TOKEN || ""}/${
        tgTypes.setWebhook
      }`,
      {
        url: `${process.argv[2]}/${process.env.TG_TOKEN || ""}`,
      },
    )
    .then(({ data }: { data: Object }) => data.description);

export const setExpireDate = (quantity: number, type: string = "minutes") =>
  moment().add(quantity, type);
