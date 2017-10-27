import axios from "axios";

import { whoAmI, showGroups } from "../Telegram/handlers";
import { tgCommands } from "../Shared/types";

const internalReq = axios.create({
    baseURL: `http://localhost:${process.env.PORT}`
});

export const init = async ({ body }, res) => {
    const message = body.message || body.edited_message;
    const command = message.text.split(" ")
        .map(el => el.trim())
        .filter(el => el)
        .find(str => str.startsWith("/"));

    const isCommandExists = Object.values(tgCommands).includes(command);

    if (!command || !isCommandExists) {
        res.sendStatus(200);
        return;
    }
    await internalReq.post(`/${process.env.TG_TOKEN}${command}`, {
        ...body
    });
    res.sendStatus(200);
};

export const whoAmIController = async (req, res) => {
    await whoAmI();
    res.sendStatus(200);
};

export const showGroupsController = async ({ body }, res) => {
    await showGroups(body.message.from.id);
    res.sendStatus(200);
};
