import axios from "axios";

import { catchErrors, handleError } from "../Shared/errorHandlers";

import { tgTypes } from "../Shared/types";

const Bot = ({ body }, res) => {
    res.sendStatus(200);
    return {
        handle: type => async callback => {
            const message = body.message || body.edited_message;
            const command = message.text.split(" ")[0];
            if (command !== type) {
                return;
            }
            const [err] = await catchErrors(
                callback({
                    message,
                }),
            );
            if (err) {
                handleError("АШИПКА", err);
            }
        },
    };
};

export const initTelegram = async () => {
    const { data } = await axios.post(
        `https://api.telegram.org/bot${process.env.TG_TOKEN}/${tgTypes.setWebhook}`,
        {
            url: `${process.argv[2]}/${process.env.TG_TOKEN}`,
        },
    );

    return data.description;
};

export default Bot;
