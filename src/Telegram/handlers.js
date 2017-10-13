import User from "../models/User";
import Group from "../models/Group";

export const addUser = async ({ message }) => {
    await User.sync({ force: true });
    const res = await User.create({
        UserId: message.from.id,
        Login: message.from.username,
    });
    console.log(res);
};

export const whoAmI = async () => {
    const res = await User.findAll({
        include: [Group],
    });

    console.log(res[0].get({
        plain: true
    }));
};
