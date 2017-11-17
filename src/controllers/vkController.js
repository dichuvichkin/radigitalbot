import axios from "axios";

import { onWallReplyNew } from "../VK/handlers";
import { confirmBot, getPayedUsers } from "../VK/helpers";
import { vkTypes } from "../Shared/types";

const internalReq = axios.create({
    baseURL: `http://localhost:${process.env.PORT}`
});

export const mainController = async ({ body }, res) => {
    const vkTypesKeys = Object.keys(vkTypes);
    const index = vkTypesKeys
        .map(key => vkTypes[key])
        .findIndex(i => i === body.type);
    if (!index) {
        res.sendStatus(200);
        return;
    }

    await internalReq.post(`/vkRoute/${vkTypesKeys[index]}`, {
        ...body
    });

    res.sendStatus(200);
};

export const confirmationController = async ({ body }, res, next) => {
    if (body.type === vkTypes.confirmation) {
        const answer = await confirmBot({
            GroupId: body.group_id
        });
        res.send(answer);
        return;
    }
    next();
};

export const wallReplyNewController = async ({ body }, res) => {
    const users = await getPayedUsers({ GroupId: body.group_id });
    if (users) {
        await onWallReplyNew({
            GroupId: body.group_id,
            FromId: body.object.from_id,
            PostOwnerId: body.object.post_owner_id,
            id: body.object.id,
            text: body.object.text,
            users,
            attachments: body.object.attachments
        });
    }
    res.sendStatus(200);
};