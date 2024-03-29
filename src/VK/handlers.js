import { getData, getUserAndGroup } from "./helpers";
import { sendMessage, sendMessages } from "../Shared/helpers";
import methods from "./methods";

export const onWallReplyNew = async ({
                                         GroupId,
                                         FromId,
                                         PostOwnerId,
                                         text,
                                         id,
                                         users = [],
                                         attachments = [],
                                     }) => {
    const { first_name, last_name, files, screen_name } = await getUserAndGroup({
        userData: {
            user_ids: FromId,
            fields: "photo_200",
        },
        groupData: {
            group_ids: GroupId,
        },
        attachments,
    });

    const message = `Пользователь <a href="https://vk.com/id${FromId}">${first_name} ${last_name}</a> оставил комментарий под <a href="https://vk.com/${screen_name}?w=wall${PostOwnerId}_${id}">постом</a>: <i>${text}</i> ${files}`;

    await sendMessages(message, users);
};

export async function onNewMessage({ user_id, group_id, body }) {
    const { first_name, last_name, name, screen_name } = await getUserAndGroup({
        userData: {
            user_ids: user_id,
            fields: "photo_200",
        },
        groupData: {
            group_ids: group_id,
        },
    });

    const message = `Пользователь <a href="https://vk.com/id${user_id}">${first_name} ${last_name}</a> оставил сообщение в группе <a href="https://vk.com/${screen_name}">${name}</a> :\n<i>${body}</i>`;
    sendMessage(message);
}

export async function onNewPhotoComment({
                                            group_id,
                                            photo_id,
                                            text,
                                            from_id,
                                            attachments = [],
                                        }) {
    const {
        first_name,
        last_name,
        name,
        screen_name,
        files,
    } = await getUserAndGroup({
        userData: {
            user_ids: from_id,
            name_case: "gen",
        },
        groupData: {
            group_ids: group_id,
        },
        attachments,
    });

    const photos = await getData({
        vkMethod: methods.photosGetById,
        photos: `-${group_id}_${photo_id}`,
    });

    const { photo_604 } = photos.response.find(
        el => el.owner_id.toString() === `-${group_id}`,
    );

    const message = `Новый <a href="https://vk.com/photo-${group_id}_${photo_id}">комментарий</a> под <a href="${photo_604}">фотографией</a> в группе <a href="https://vk.com/${screen_name}">${name}</a> от <b>${first_name} ${last_name}</b>: <i>${text}</i> ${files}`;

    sendMessage(message);
}

export async function onBoardPostNew(body) {
    console.log(body);
}
