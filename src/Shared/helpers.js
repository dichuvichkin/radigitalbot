import axios from "axios";
import moment from "moment";

import { User } from "../models";

import { tgTypes } from "./types";

export const postData = (token = "", id) => type => async (data = {}) => {
    await axios.post(`https://api.telegram.org/bot${token}/${type}`, {
        chat_id: id,
        ...data,
    });
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

export const hasAccountPaid = async UserId => {
    const payExpiresDay = await User.find({
        where: { UserId },
        attributes: ["payExpiresDay"],
    }).get("payExpiresDay");

    return moment(payExpiresDay).diff(moment()) > 0;
};
