import axios from "axios";
import Sequelize from "sequelize";
import moment from "moment";
import methods from "./methods";
import { Group } from "../models";

const { Op } = Sequelize;

export const getData = ({ v = "5.8", vkMethod, ...rest }: { v: string, vkMethod: string, rest: Object }) =>
    axios
        .get(`https://api.vk.com/method/${vkMethod}`, {
            params: {
                v,
                ...rest,
            },
        })
        .then(({ data }) => data)
        .catch(({ response }) => console.error(response));

export const getUserAndGroup = async ({
                                          userData,
                                          groupData,
                                          attachments = [],
                                      }: {
    userData: Object,
    groupData: Object,
    attachments: Array<any>
}) => {
    const [users, groups] = await Promise.all([
        getData({
            vkMethod: methods.usersGet,
            ...userData,
        }),
        getData({
            vkMethod: methods.groupsGetById,
            ...groupData,
        }),
    ]);

    const files = attachments.map(
        el => el.type === "photo" && el.photo.photo_604,
    );

    const [user, group] = [
        users.response.find(el => el.id === userData.user_ids),
        groups.response.find(el => el.id === groupData.group_ids),
    ];

    return {
        ...user,
        ...group,
        files,
    };
};

export const confirmBot = async ({ GroupId }: { GroupId: number }) => {
    const answer = await Group.findOne({
        where: { GroupId },
        attributes: ["Answer"],
    }).get("Answer");
    return answer;
};

export const getPayedUsers = async ({ GroupId }: { GroupId: number }) => {
    const groups = await Group.find({
        where: { GroupId },
    });
    const currentDate = moment().format();
    const users = await groups
        .getUsers({
            where: {
                payExpiresDay: {
                    [Op.gt]: currentDate,
                },
            },
            attributes: ["UserId"]
        })
        .map(group => group.get("UserId"));

    if (!users.length) {
        return null;
    }

    return users;
};
