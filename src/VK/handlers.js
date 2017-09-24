import {
    getData,
    sendMessage
} from "./helpers";
import methods from "./methods";

export const onNewWallPostComment = async({
    group_id,
    from_id,
    post_owner_id,
    text,
    id,
    attachments = []
}) => {
    const [user, group] = await Promise.all([getData({
        vkMethod: methods.usersGet,
        user_ids: from_id,
        fields: "photo_200"
    }), getData({
        vkMethod: methods.groupsGetById,
        group_ids: group_id
    })]);

    const [{
        first_name,
        last_name
    }, {
        screen_name
    }] = [user.response.find(el => el.id === from_id), group.response.find(el => el.id === group_id)];
    const files = attachments.map(el => el.type === "photo" && el.photo.photo_604);

    const message = `Пользователь <a href="https://vk.com/id${from_id}">${first_name} ${last_name}</a> оставил комментарий под <a href="https://vk.com/${screen_name}?w=wall${post_owner_id}_${id}">постом</a>: <i>${text}</i> ${files}`;
    sendMessage(message);
};

export const onNewMessage = async({
    user_id,
    group_id,
    body
}) => {
    const [user, group] = await Promise.all([getData({
        vkMethod: methods.usersGet,
        user_ids: user_id,
        fields: "photo_200"
    }), getData({
        vkMethod: methods.groupsGetById,
        group_ids: group_id
    })]);

    const [{
        first_name,
        last_name
    }, {
        name,
        screen_name
    }] = [user.response.find(el => el.id === user_id), group.response.find(el => el.id === group_id)];
    const message = `Пользователь <a href="https://vk.com/id${user_id}">${first_name} ${last_name}</a> оставил сообщение в группе <a href="https://vk.com/${screen_name}">${name}</a> :\n<i>${body}</i>`;
    sendMessage(message);
};