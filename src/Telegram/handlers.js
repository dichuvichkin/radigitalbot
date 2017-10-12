import User from "../models/User";

export const addUser = async ({ message }) => {
    await User.sync();
    await User.create({
        UserId: message.from.id,
        Login: message.from.username,
    });
};

export const whoAmI = async ({ message }) => {
    const res = await User.findOne({
        where: { UserId: message.from.id },
        attributes: ["UserId", "Login"],
    });

    console.log(
        res.get({
            plain: true,
        }),
    );
};
